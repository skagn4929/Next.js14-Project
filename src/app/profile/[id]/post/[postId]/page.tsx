"use client";

import { useParams } from "next/navigation";

export default function ProfileIDPostID() {
  const params = useParams();
  console.log("id");
  console.log(params.id);
  console.log("postId");
  console.log(params.postId);

  // eslint-disable-next-line react/no-unescaped-entities
  return <div>my id profile's posts page</div>;
}
