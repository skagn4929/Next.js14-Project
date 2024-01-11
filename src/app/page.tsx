import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My page title",
  description: "This a description",
};

export default function Home() {
  return <div>Main page</div>;
}
