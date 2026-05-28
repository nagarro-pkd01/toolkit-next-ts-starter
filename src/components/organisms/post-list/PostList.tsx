import { PostCard } from "@/components/organisms/post-card/PostCard";
import type { Post } from "@/types/postTypes";

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
