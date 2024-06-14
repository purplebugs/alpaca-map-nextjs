import Link from "next/link";

export const Pagination = ({ searchParams, items, section }) => {
  const urlSearchParams = new URLSearchParams(searchParams);

  return (
    <div data-testid={`pagination-${section}`}>
      {items?.map((page, index) => {
        urlSearchParams.set(section, page);
        return (
          <span key={index}>
            {index === 0 ? "" : " - "}
            <Link href={`/search?${urlSearchParams.toString()}`}>{page}</Link>
          </span>
        );
      })}
    </div>
  );
};
