import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { File, Flag, Server } from "lucide-react";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";

const iconProps = {
  size: 16,
  strokeWidth: 1.5,
  style: { marginTop: 2, marginLeft: 2 },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      sidebar={{
        tabs: {
          transform: (option, node) => {
            const icons: Record<string, ReactNode> = {
              "feature-flags": <Flag {...iconProps} />,
              "self-hosting": <Server {...iconProps} />,
              forms: <File {...iconProps} />,
              platform: <Server {...iconProps} />,
            };

            return {
              ...option,
              icon: icons[node.$id as keyof typeof icons] ?? (
                <File {...iconProps} />
              ),
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
