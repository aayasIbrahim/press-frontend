"use client";
import { Input } from "@base-ui/react";
import { SearchIcon } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function NewsSearchBar() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  //set the http://localhost:3000/news?searchTerm=news  here news is value which is come from the input field and set the searchTerm in the url

  const handleChange = (value: string) => {
    const params = new URLSearchParams();
    // Set the searchTerm parameter based on the input value

    if (value) {
      params.set("searchTerm", value);
    } else {
      params.delete("searchTerm");
    }
    router.replace(`${pathName}?${params.toString()}`);
    // Replace the current URL with the new search parameters hit the link and  the qurey form backend
  };

  return (
    <div className="relative max-w-sm ">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="pl-9"
        //fill the input with the searchTerm from the url if it exists
        defaultValue={
          searchParams.get("searchTerm")
            ? searchParams.get("searchTerm")?.toString()
            : ""
        }
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

export default NewsSearchBar;
