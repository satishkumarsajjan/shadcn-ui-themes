import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function PaginationDemo() {
  return (
    <div className='flex flex-col gap-4 border rounded-md drop-shadow-md p-4 w-full'>
      <Label className='font-semibold text-xl text-foreground'>
        Pagination
      </Label>
      <div className='flex items-center justify-center'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className='cursor-pointer' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className='cursor-pointer'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive className='cursor-pointer'>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className='cursor-pointer'>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext className='cursor-pointer' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
