import LoginForm from "@/app/components/LoginForm";

export default function Home() {
  return (
    <main>
      <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-light to-primary overflow-x-hidden'>
        <LoginForm />
      </div>
    </main>
  );
}
