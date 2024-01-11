"use client";

import { useParams } from "next/navigation";

export default function ProfileID() {
  const params = useParams();
  console.log(params.id);
  return <div>my id profile page</div>;
}
