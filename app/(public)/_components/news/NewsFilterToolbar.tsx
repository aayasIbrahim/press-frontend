"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsFilterBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL থেকে মানগুলো পড়া
  // const searchTerm = searchParams.get("searchTerm") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  // Sorting পাল্টানোর হ্যান্ডলার
  const handleSortChange = (value: string | null) => {
    if (!value) return;

    const [selectedSortBy, selectedSortOrder] = value.split("-");
    const params = new URLSearchParams(searchParams.toString());

    params.set("sortBy", selectedSortBy);
    params.set("sortOrder", selectedSortOrder);
    params.set("page", "1"); // সর্টিং পাল্টালে প্রথম পেজে নিয়ে যাবে

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Search করার হ্যান্ডলার (Enter বা টাইপ করার জন্য)
  // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const search = (formData.get("search") as string)?.trim() || "";
  //   const params = new URLSearchParams(searchParams.toString());

  //   if (search) {
  //     params.set("searchTerm", search);
  //   } else {
  //     params.delete("searchTerm"); // ইনপুট খালি থাকলে URL থেকে মুছে ফেলা
  //   }

  //   params.set("page", "1"); // সার্চ করলে প্রথম পেজে নিয়ে যাবে
  //   router.replace(`${pathname}?${params.toString()}`);
  // };

  // ফিল্টার রিসেট করার হ্যান্ডলার
  const handleReset = () => {
    router.replace(pathname);
  };

  const currentValue = `${sortBy}-${sortOrder}`;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-lg border shadow-sm my-6">
      {/* Search Input Box */}
      {/* <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto">
        <Input
          type="text"
          name="search"
          placeholder="Search news..."
          defaultValue={searchTerm}
          className="w-full sm:w-[250px]"
        />
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </form> */}

      {/* Sorting & Reset Section */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <Select value={currentValue} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt-desc">Newest First</SelectItem>
            <SelectItem value="createdAt-asc">Oldest First</SelectItem>
            <SelectItem value="views-desc">Most Viewed</SelectItem>
            <SelectItem value="title-asc">Title (A-Z)</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filter Button (যদি কোনো সার্চ বা ফিল্টার সক্রিয় থাকে) */}

        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
