"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface NewsPaginationProps {
  totalPages: number;
  currentPage: number;
}

export function NewsPagination({
  totalPages,
  currentPage,
}: NewsPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL-এর বর্তমান ফিল্টার বজায় রেখে নতুন page তৈরি করার হেল্পার
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // ১ পেজ বা তার কম থাকলে পেজিনেশন বার দেখানোর প্রয়োজন নেই
  // if (totalPages <= 1) return null;

  // ডাইনামিক পেজ নম্বর ও ডট (...) জেনারেট করার লজিক
  const generatePagination = () => {
    // পেজ সংখ্যা ৭ বা তার কম হলে সব পেজ একসাথে দেখাবে
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // বর্তমান পেজ একদম শুরুর দিকে থাকলে
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    // বর্তমান পেজ একদম শেষের দিকে থাকলে
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // বর্তমান পেজ মাঝের দিকে থাকলে
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = generatePagination();

  return (
    <Pagination className="my-6">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {/* Dynamic Page Numbers */}
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageURL(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages
                ? createPageURL(currentPage + 1)
                : "#"
            }
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}