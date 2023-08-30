import { ServerResponse } from "@/src/app/api/types/types";
import { PostList } from "@/src/components/PostList";

async function getInitialData() {
  const response = await fetch("http://localhost:3000/api/posts");
  return (await response.json()) as ServerResponse;
}

export default async function IndexPage() {
  const initialData = await getInitialData();
  return (
    <div>
      <div className="space-y-2 pt-6 pb-8 text-center">
        <h1 className="text-5xl font-extrabold leading-9 tracking-tight text-gray-900 ">
          From The Blog
        </h1>
        <h2 className="text-3xl leading-9 tracking-tight text-gray-900">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        </h2>
      </div>
      <PostList initialPosts={initialData.posts}/>
    </div>
  );
}
