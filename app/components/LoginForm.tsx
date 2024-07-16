"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signin, type User } from "@/utils/Authentication";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SigninForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputField =
    "text-black block w-full appearance-none bg-inherit border-b border-gray-700 lg:border-gray-300 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm";
  const label = "mb-2";

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const user: User = {
      email,
      password,
    };

    try {
      await signin(user);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        alert("Error: Invalid Credentials.");
      } else {
        console.error("An unknown error occurred");
        alert("An unknown error occurred");
      }
    } finally {
      // Re-enable the button regardless of success or failure
      setIsSubmitting(false);
    }
  };

  return (
    <div className='absolute mb-8 mt-12 w-[95%] max-w-lg rounded shadow-md bg-white p-8 lg:mb-0 lg:mt-0'>
      <h1 className='mb-8 text-center text-3xl font-bold '>Sign in</h1>
      <form className='space-y-4' onSubmit={handleSignIn}>
        <div className='flex flex-col'>
          <label htmlFor='email' className={label}>
            Email:
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputField}
            />
          </label>
          <br />
          <label htmlFor='password' className={label}>
            Password:
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`${inputField} pr-10`}
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>
          <br />
          <div className='mt-4 space-x-4 text-center'>
            <button
              type='submit'
              className='btn-primary cursor-pointer rounded px-6 py-2 lg:px-6'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
