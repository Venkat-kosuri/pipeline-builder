'use client';

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

