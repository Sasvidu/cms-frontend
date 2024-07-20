import TopicList from "../components/TopicList";
import { AuthProvider } from "../context/AuthProvider";

export default function Home() {
  return (
    <AuthProvider>
      <main className='flex min-h-screen justify-center overflow-x-hidden'>
        <TopicList />
      </main>
    </AuthProvider>
  );
}
