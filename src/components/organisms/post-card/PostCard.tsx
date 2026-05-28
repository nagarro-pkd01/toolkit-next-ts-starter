import type { Post } from "@/types/postTypes";

import styles from "./PostCard.module.scss";

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className={styles.card}>
      <span className={styles.meta}>Post #{post.id}</span>
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.body}>{post.body}</p>
    </article>
  );
};
