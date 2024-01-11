export default function PostID({ params, searchParams }: any) {
  console.log(searchParams);
  return <main>Post {searchParams.new}</main>;
}
