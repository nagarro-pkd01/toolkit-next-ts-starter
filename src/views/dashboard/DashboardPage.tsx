import { PostList } from "@/components/organisms/post-list/PostList";
import { DashboardLayout } from "@/components/templates/dashboard-layout/DashboardLayout";
import { postsService } from "@/services/posts";
import { withErrorBoundary } from "@/utils/errors/errorBoundary";

import styles from "./DashboardPage.module.scss";

const getPosts = async () => {
  return withErrorBoundary(() => postsService.getPosts(), {
    layer: "views/dashboard/DashboardPage",
    operation: "getPosts",
  });
};

type DashboardPageProps = {
  clientKey?: string;
};

export default async function DashboardPage({ clientKey }: DashboardPageProps) {
  const posts = await getPosts();

  return (
    <DashboardLayout clientKey={clientKey}>
      <div className={styles.content}>
        <div>
          <h1>Dashboard</h1>
          <p className={styles.subtitle}>Recent posts from JSONPlaceholder ({posts.length})</p>
        </div>
        <PostList posts={posts} />
      </div>
    </DashboardLayout>
  );
}
