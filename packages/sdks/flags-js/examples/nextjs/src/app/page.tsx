"use client";

import Image from "next/image";
import styles from "./page.module.css";
// Feature Flags Hooks
import { useFlag } from "../libs/feature-flags/hooks";

export default function Home() {
  const count = useFlag<{ text: string }>("count");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {count.enabled && (
          <div className={styles.ctas}>
            <a className={styles.secondary}>
              {!count.enabled
                ? "Count is not enabled"
                : `${count?.payload?.text} 0`}
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
