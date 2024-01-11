"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <h1>my list of profiles</h1>
      <div>
        <Link href="/profile/1">Profile 1</Link>
        <Link href="/profile/2">Profile 2</Link>
        <Link href="/profile/3">Profile 3</Link>
      </div>
    </div>
  );
}
