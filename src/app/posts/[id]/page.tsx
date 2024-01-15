// Fetch on Client Component
"use client";

import { useEffect, useState } from "react";

type Post = {
  title?: string;
  description?: string;
};

export default function PostID({ params }: any) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  const getPostById = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/posts/${params.id}`,
        {
          method: "GET",
        }
      );

      if (response) {
        const { post } = await response.json();
        if (post) setPost(post);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostById();
  }, []);

  return (
    <main>
      react baic
      {loading && <div>loading</div>}
      {!loading && (
        <div>
          {post && <h1>{post.title}</h1>}
          {post && <p>{post.description}</p>}
        </div>
      )}
    </main>
  );
}

// Fetch on Server Component

// async function getPostById(postId: string) {
//   const response = await fetch(`http://localhost:3000/api/post/${postId}`, {method: 'GET'});

//   return response.json();
// }

// export default async function PostID({params}:any) {
//   const {post} = await getPostById(params.id);

// return (
//     <main>
//       <h1>{post.title}</h1>
//       <p>{post.description}</p>
//     </main>
//   );
// }
