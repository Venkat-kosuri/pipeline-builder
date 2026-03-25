from collections import defaultdict, deque
from typing import Any, Dict, List, Optional, Set

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


class PipelineNode(BaseModel):
    id: str

    model_config = ConfigDict(extra="ignore")


class PipelineEdge(BaseModel):
    source: str
    target: str

    model_config = ConfigDict(extra="ignore")


class ParsePipelineRequest(BaseModel):
    nodes: List[PipelineNode]
    edges: List[PipelineEdge]

    model_config = ConfigDict(extra="ignore")


def is_graph_dag(nodes: List[PipelineNode], edges: List[PipelineEdge]) -> bool:
    """
    Directed graph cycle detection using Kahn's algorithm.
    """
    node_ids: Set[str] = {n.id for n in nodes}
    num_nodes = len(nodes)

    # Build adjacency + in-degree.
    indegree: Dict[str, int] = {node_id: 0 for node_id in node_ids}
    adjacency: Dict[str, List[str]] = defaultdict(list)

    for e in edges:
        if e.source not in node_ids or e.target not in node_ids:
            raise HTTPException(
                status_code=422,
                detail=f"Edge references missing node id (source={e.source}, target={e.target}).",
            )
        adjacency[e.source].append(e.target)
        indegree[e.target] += 1

    queue = deque([node_id for node_id, deg in indegree.items() if deg == 0])
    visited = 0

    while queue:
        node_id = queue.popleft()
        visited += 1

        for neighbor in adjacency.get(node_id, []):
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == num_nodes


@app.post("/pipelines/parse")
def parse_pipeline(payload: ParsePipelineRequest):
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)

    is_dag = is_graph_dag(payload.nodes, payload.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }
