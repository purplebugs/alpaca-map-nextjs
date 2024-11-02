import Link from "next/link";

export const Pagination = ({ searchParams, items, section }) => {
  const urlSearchParams = new URLSearchParams(searchParams);

  return (
    items?.length > 1 && (
      <div
        data-testid={`pagination-${section}`}
        className="hover:bg-brown-400 text-center p-1 m-0.5 sm:p-3 sm:m-3 bg-brown-200 rounded-xl shadow-lg"
      >
        {items?.map((page, index) => {
          urlSearchParams.set(section, page);
          return (
            <span key={index}>
              {index === 0 ? "" : " - "}
              <Link
                href={`/search?${urlSearchParams.toString()}`}
                className="underline hover:underline hover:decoration-8"
              >
                {page}
              </Link>
            </span>
          );
        })}
      </div>
    )
  );
};
