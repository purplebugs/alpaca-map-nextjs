"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchAlpacaFarmArea({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((term) => {
    // Ref: https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#2-update-the-url-with-the-search-params

    const params = new URLSearchParams();

    params.set("query", term);

    replace(`${pathname}?${params.toString()}`);
  }, 200);

  return (
    <>
      <div>
        <h3 className="text-2xl font-bold leading-loose tracking-tight">
          <label htmlFor="search-by-alpaca">Find alpaca, farm, area</label>
        </h3>
      </div>
      <div id="text-search-by-alpaca">
        <input
          className="rounded-full px-4 py-4 w-full border-2"
          name="search-by-alpaca"
          id="search-by-alpaca"
          type="text"
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          // Ref: https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#3-keeping-the-url-and-input-in-sync
          defaultValue={searchParams.get("query")?.toString()}
        />{" "}
      </div>
    </>
  );
}
