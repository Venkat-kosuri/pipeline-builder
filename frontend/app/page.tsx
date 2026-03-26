'use client';

/**
 * App entry point for the pipeline builder UI.
 *
 * Renders the node palette (`PipelineToolbar`), the canvas (`PipelineUI`),
 * and the submit button (`SubmitButton`).
 */
import 'reactflow/dist/style.css';
import { PipelineToolbar } from '../src/components/PipelineToolbar';
import { PipelineUI } from '../src/components/PipelineUI';
import { SubmitButton } from '../src/components/SubmitButton';

export default function Page() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

