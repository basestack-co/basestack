import { redirect } from "next/navigation";

export default function HomePage() {
  return redirect("/docs/self-hosting");
}
