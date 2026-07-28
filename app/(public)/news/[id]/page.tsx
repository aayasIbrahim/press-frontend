import { getSinglePost } from "../../_actions/postAction";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await getSinglePost(id as string);
  console.log(post);
  // if(result.success&&result.data){}

  return <div>My Post: {id}</div>;
}
