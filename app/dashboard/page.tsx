import ArticleList from "../components/ArticleList";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className='flex min-h-screen justify-center overflow-x-hidden'>
      <ArticleList />
    </main>
  );
}
