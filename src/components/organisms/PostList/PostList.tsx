import { PostCard } from "@/components/organisms/PostCard/PostCard";
import type { Post } from "@/types/post-types";

import styles from "./PostList.module.scss";

type PostListProps = {
  posts: Post[];
};

export const PostList = ({ posts }: PostListProps) => {
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};
