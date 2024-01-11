const fetchPost = async (postId: string) => {
  const post = await fetch(`/api/posts/${postId}`, {
    method: "GET",
  });
  return post.json();
};

export async function generateMetadata({ params }: any) {
  const { post } = await fetchPost(params.id);
  return {
    title: post[0].title,
    description: post[0].description,
  };
}

export default function PostID({ params }: any) {
  return <div>Post {params.id}</div>;
}
