import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { Flag, Server, File } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      sidebar={{
        tabs: {
          transform: (option, node) => {
            const icons: Record<string, ReactNode> = {
              "feature-flags": <Flag size={16} />,
              "self-hosting": <Server size={16} />,
              forms: <File size={16} />,
              platform: <Server size={16} />,
            };

            return {
              ...option,
              icon: icons[node.$id as keyof typeof icons] ?? <File size={16} />,
            };
          },
        },
      }}
      {...baseOptions}
    >
      {children}
    </DocsLayout>
  );
}
