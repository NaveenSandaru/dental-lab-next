import { Suspense } from 'react';
import LabPageClient from './LabPageClient';

export default function LabPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LabPageClient />
    </Suspense>
  );
}
