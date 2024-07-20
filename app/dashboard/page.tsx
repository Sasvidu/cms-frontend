import ArticleList from "../components/ArticleList";
import { AuthProvider } from "../context/AuthProvider";

export default function Home() {
  return (
    <AuthProvider>
      <main className='flex min-h-screen justify-center overflow-x-hidden'>
        <ArticleList />
      </main>
    </AuthProvider>
  );
}
