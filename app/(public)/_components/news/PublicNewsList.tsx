/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewsCard } from "@/app/(public)/_components/news/NewsCard";
import { IPost } from "@/lib/type";

export async function PublicNewsList() {
  const getPosts = async () => {
    "use server";
    const res = await fetch(`${process.env.BACKEND_URL}/api/posts`);
    const results = await res.json();
    return results;
  };
  
  const result = await getPosts();

  if (!result.success || !result.data?.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">No news found.</p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.data.map((post: IPost) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
