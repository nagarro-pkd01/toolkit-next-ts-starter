import Link from "next/link";

import { ProductPageTemplate } from "@/components/templates/ProductPage/ProductPageTemplate";
import { APP_ROUTES } from "@/constants/routeConstants";
import { RENDERING_EXAMPLES } from "@/services/rendering/rendering-examples";

import styles from "./RenderingExamplePage.module.scss";

export default function RenderingHubPage() {
  return (
    <ProductPageTemplate>
      <div className={styles.page}>
        <h1>Rendering strategies</h1>
        <p className={styles.lead}>
          Live examples for static, dynamic, ISR, streaming, and client rendering. See{" "}
          <code>docs/RENDERING_STRATEGIES.md</code> for when to use each.
        </p>
        <ul className={styles.exampleList}>
          {RENDERING_EXAMPLES.map((example) => (
            <li key={example.href}>
              <Link className={styles.card} href={example.href}>
                <span className={styles.strategy}>{example.strategy}</span>
                <span className={styles.cardTitle}>{example.title}</span>
                <span className={styles.cardDescription}>{example.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.note}>
          Existing routes: <Link href={APP_ROUTES.home}>shop (dynamic)</Link>,{" "}
          <Link href={APP_ROUTES.dashboard}>dashboard (dynamic)</Link>,{" "}
          <Link href={APP_ROUTES.signIn}>sign-in (static)</Link>.
        </p>
      </div>
    </ProductPageTemplate>
  );
}
