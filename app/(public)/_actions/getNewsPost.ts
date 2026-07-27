"use server";

export const getNewsPost = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();
  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/posts?${params.toString()}`,
  );
  const results = await res.json();
  //   console.log(results)
  return results;
};
