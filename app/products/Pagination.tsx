'use client';

import { Button } from '@/components/ui/button';

interface Props {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onChange }: Props) {
  return (
    <div className="flex gap-2 justify-center">
      <Button variant="outline" disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)}>
        Previous
      </Button>
      {[...Array(totalPages)].map((_, idx) => (
        <Button
          key={idx}
          variant={currentPage === idx + 1 ? 'default' : 'outline'}
          onClick={() => onChange(idx + 1)}
        >
          {idx + 1}
        </Button>
      ))}
      <Button variant="outline" disabled={currentPage === totalPages} onClick={() => onChange(currentPage + 1)}>
        Next
      </Button>
    </div>
  );
}
