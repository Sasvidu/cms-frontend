import { AuthProvider } from "../context/AuthProvider";

export default function Home() {
  return (
    <AuthProvider>
      <main>
        <div className='flex min-h-screen items-center justify-center overflow-x-hidden'>
          Dashboard
        </div>
      </main>
    </AuthProvider>
  );
}
