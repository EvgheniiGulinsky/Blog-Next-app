import { CategoriesEnum, Post } from "@/src/app/api/types/types";
import { Tab } from "@/src/components/Tab";
import { HTMLProps } from "react";
import Image from 'next/image';

interface PostCardProps extends HTMLProps<HTMLDivElement>{
  post: Post
}

const categoriesMapper: { [key: number]: string } = {};
for (const key in CategoriesEnum) {
  if (!isNaN(Number(key))) {
    categoriesMapper[key] = CategoriesEnum[key];
  }
}

export const PostCard = (props: PostCardProps) => {
  const {post, ...otherProps} = props;

  return (
    <div className="w-380 h-600 p-4 border rounded shadow-lg flex flex-col hover:-translate-y-2 transform transition duration-300 ease-out" {...otherProps}>
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={380}
        height={600}
        priority
        className="w-full h-300 object-cover mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      <ul className="mb-4">
        {post.categories.map((categoryId) => (
          <Tab clickable={false} key={categoryId}>
            {categoriesMapper[categoryId]}
          </Tab>
        ))}
      </ul>

      <div className="mt-auto flex items-center">
        <Image
          src={post.imageUrl}
          alt="TestAvatar"
          width={380}
          height={600}
          priority
          className="w-8 h-8 rounded-full mr-4 object-cover hover:-translate-y-2 transform transition duration-300 ease-out"
        />
        <span>User name</span>
      </div>
    </div>
  );
};






