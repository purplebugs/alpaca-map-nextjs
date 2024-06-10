"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchAlpacaFarmArea({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (term) => {
    // Ref: https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#2-update-the-url-with-the-search-params

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    console.log(term);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <label htmlFor="search">Search</label>
      <input
        placeholder={placeholder}
        id="search"
        onChange={(e) => handleChange(e.target.value)}
        // Ref: https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#3-keeping-the-url-and-input-in-sync
        defaultValue={searchParams.get("query")?.toString()}
      />
    </>
  );
}
