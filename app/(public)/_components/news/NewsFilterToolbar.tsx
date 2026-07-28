"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NewsFilterBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL থেকে বর্তমান sortBy এবং sortOrder এর মান পড়া
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  // ড্রপডাউনের বর্তমান সিলেক্টেড ভ্যালু
  const currentValue = `${sortBy}-${sortOrder}`;

  const handleSortChange = (value: string | null) => {
    if (!value) return;
    // "createdAt-asc" থেকে sortBy="createdAt" এবং sortOrder="asc" আলাদা করা
    const [selectedSortBy, selectedSortOrder] = value.split("-");

    const params = new URLSearchParams(searchParams.toString());

    // URL এ sortBy এবং sortOrder সেট করা
    params.set("sortBy", selectedSortBy);
    params.set("sortOrder", selectedSortOrder);
    
    params.set("page", "1"); // ফিল্টার পাল্টালে ১ নম্বর পেজে নিয়ে যাওয়া

    // URL আপডেট: /news?sortBy=createdAt&sortOrder=asc
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={currentValue} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {/* Newest First -> sortBy=createdAt&sortOrder=desc */}
          <SelectItem value="createdAt-desc">Newest First</SelectItem>

          {/* Oldest First -> sortBy=createdAt&sortOrder=asc */}
          <SelectItem value="createdAt-asc">Oldest First</SelectItem>

          {/* Most Viewed -> sortBy=views&sortOrder=desc */}
          <SelectItem value="views-desc">Most Viewed</SelectItem>

          {/* Title (A-Z) -> sortBy=title&sortOrder=asc */}
          <SelectItem value="title-asc">Title (A-Z)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}