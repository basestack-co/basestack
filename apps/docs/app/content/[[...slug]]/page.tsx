import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description:
      "Comprehensive documentation for Basestack - an open-source platform providing self-hosted Feature Flags and Forms solutions. Learn how to deploy, configure, and integrate Basestack tools into your applications with our step-by-step guides, SDKs, and APIs.",
    // description: page.data.description,
    openGraph: {
      images: "https://i.imgur.com/Cund9sW.jpeg",
    },
    twitter: {
      card: "summary_large_image",
      images: "https://i.imgur.com/Cund9sW.jpeg",
    },
    // @ts-expect-error - tags is not defined in the page data
    keywords: (page.data.tags ?? "").split(", "),
  };
}
