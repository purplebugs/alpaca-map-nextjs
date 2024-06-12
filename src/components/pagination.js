import Link from "next/link";

export const Pagination = ({ items, query, pageNumber }) => {
  return (
    <div>
      {items?.map((page, index) => (
        <>
          {index === 0 ? "" : " - "}
          <Link href={`/search?query=${query}&${pageNumber}=${page}`}>{page}</Link>
        </>
      ))}
    </div>
  );
};
