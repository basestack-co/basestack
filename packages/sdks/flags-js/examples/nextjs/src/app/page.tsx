"use client";

import Image from "next/image";
// Feature Flags Hooks
import { useFlag, useFlags } from "@/libs/feature-flags/hooks";
import styles from "./page.module.css";

export default function Home() {
  const count = useFlag<{ text: string }>("count");
  const data = useFlags();

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
            <a className={styles.secondary} href="/">
              {!count.enabled
                ? "Count is not enabled"
                : `${count?.payload?.text} 0`}
            </a>
          </div>
        )}

        <h3>All the available flags</h3>
        <ul>
          {data?.flags?.map((flag, index) => {
            return (
              <li
                key={index}
              >{`Slug: ${flag.slug} Enabled: ${flag.enabled}`}</li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
