import RegisterForm from "@/app/components/RegisterForm";

export default function Home() {
  return (
    <main>
      <div className='flex min-h-screen flex-col items-center justify-center overflow-x-hidden'>
        <RegisterForm />
      </div>
    </main>
  );
}
