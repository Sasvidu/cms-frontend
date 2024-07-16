import LoginForm from "@/app/components/LoginForm";

export default function Home() {
  return (
    <main>
      <div className='flex min-h-screen flex-col items-center justify-center overflow-x-hidden'>
        <LoginForm />
      </div>
    </main>
  );
}
