"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { SearchIcon, XIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce"; // npm i use-debounce
import { useState } from "react";

function NewsSearchBar() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentSearchTerm = searchParams.get("searchTerm") ?? "";
  const [text, setText] = useState(currentSearchTerm);

  // key on the wrapper ensures the input state resets when the URL search term changes
  // without synchronously updating state inside an effect.
  // Debounced Search Handler (৩০০ মিলি-সেকেন্ড পর URL আপডেট হবে)
  const handleSearch = useDebouncedCallback((value: string) => {
    // ১. বিদ্যমান সব searchParams কপি করে নিয়ে আসা (যেন sortBy, tags এগুলো না মুছে যায়)
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("searchTerm", value.trim());
    } else {
      params.delete("searchTerm");
    }

    // ২. নতুন সার্চ দিলে অবশ্যই ১ম পেজে ফেরত নিয়ে যাওয়া উচিত
    params.set("page", "1");

    // ৩. URL আপডেট করা
    router.replace(`${pathName}?${params.toString()}`);
  }, 300);

  // Input Type Handler
  const handleChange = (value: string) => {
    setText(value);
    handleSearch(value);
  };

  // Clear Input Handler
  const handleClear = () => {
    setText("");
    handleSearch("");
  };

  return (
    <div className="relative w-full max-w-sm">
      {/* Search Icon */}
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      {/* Input Field */}
      <input
        type="text"
        value={text}
        placeholder="Search news..."
        onChange={(e) => handleChange(e.target.value)}
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 pr-8 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />

      {/* Clear Button (X) */}
      {text && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  );
}

export default NewsSearchBar;
