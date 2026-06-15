import { PostCard } from "@/components/Posts/post-card/PostCard";
import type { Post } from "@/types/post-types";

import styles from "./PostList.module.scss";

type PostListProps = Readonly<{
  posts: Post[];
}>;

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
