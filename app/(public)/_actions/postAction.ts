"use server";
import { cookies } from "next/headers";
export const getNewsPost = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();

  
  //pro logic

  // if (query) {
  //   Object.entries(query).forEach(([key, value]) => {
  //     // Object.entries(query) অবজেক্টের প্রতিটি Key-Value জোড়াকে একটি অ্যারেতে রূপান্তর করে।
  //     // যেমন: { searchTerm: "nextjs", page: 1 } হয়ে যায় -> [ ["searchTerm", "nextjs"], ["page", 1] ]
  //     // .forEach() দিয়ে সেই জোড়াগুলোকে ধরে ধরে লুপ বা আইটারেট চালানো হচ্ছে।
  //     // [key, value] অংশটিতে Destructuring করা হয়েছে (যেমন: key = "searchTerm", value = "nextjs")
  //     if (value !== undefined && value !== null && value !== "") {
  //       if (Array.isArray(value)) {
  //         // value যদি অ্যারে হয় (যেমন tags: ['tech', 'news'])
  //         // তাহলে JSON.stringify করে পাঠানো ভালো যেন ব্যাকএন্ড সহজে JSON.parse করতে পারে
  //         params.set(key, JSON.stringify(value));
  //       } else {
  //         params.set(key, String(value));
  //       }
  //     }
  //   });
  // }

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  } else if (query && query.title) {
    params.set("title", query.title as string);
  } else if (query && query.content) {
    params.set("content", query.content as string);
  } else if (query && query.authorId) {
    params.set("authorId", query.authorId as string);
  } else if (query && query.isFeatured) {
    params.set("isFeatured", query.isFeatured as string);
  } else if (query && query.tags) {
    const tagsValue = Array.isArray(query.tags)
      ? JSON.stringify(query.tags)
      : (query.tags as string);
    params.set("tags", tagsValue);
  } else if (query && query.status) {
    params.set("status", query.status as string);
  }

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/posts?${params.toString()}`,
  );
  const results = await res.json();

  return results;
};

export const getSinglePost = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  if (!accessToken) {
    return {
      success: false,
      message: "Your not accessable this post",
    };
  }
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/posts/${id as string}`,
    {
      headers: { cookie: `accessToken=${accessToken}` },
    },
  );
  const result = await res.json();
  console.log(result);
  return result;
};
