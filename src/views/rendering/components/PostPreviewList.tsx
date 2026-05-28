import type { Post } from "@/types/postTypes";

import styles from "./PostPreviewList.module.scss";

type PostPreviewListProps = {
  posts: Post[];
};

export const PostPreviewList = ({ posts }: PostPreviewListProps) => {
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.id} className={styles.item}>
          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.body}>{post.body}</p>
        </li>
      ))}
    </ul>
  );
};
