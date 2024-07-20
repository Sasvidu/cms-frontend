import EditArticleForm from "@/app/components/EditArticleForm";

export default function Home({ params }: any) {
  const id = params.id;

  return (
    <main className='flex min-h-screen justify-center overflow-x-hidden'>
      <EditArticleForm articleId={id} />
    </main>
  );
}
