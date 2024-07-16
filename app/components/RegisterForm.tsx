"use client";

import { useState, type MouseEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createUser, type User } from "@/utils/Authentication";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputField =
    "text-black block w-full appearance-none bg-inherit border-b border-gray-700 lg:border-gray-300 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm";
  const label = "mb-2";

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const user: User = {
      email,
      password,
    };

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      await createUser(user);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        alert("Error: Please provide proper details");
      } else {
        console.error("An unknown error occurred");
        alert("An unknown error occurred");
      }
    } finally {
      // Re-enable the button regardless of success or failure
      setIsSubmitting(false);
    }
  };

  const handleBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className='absolute mb-8 mt-12 w-[95%] max-w-lg rounded border p-8 shadow-md lg:mb-0 lg:mt-0'>
      <h1 className='mb-8 text-center text-3xl font-bold'>Register</h1>
      <form className='space-y-4' onSubmit={handleRegister}>
        <div className='flex flex-col'>
          <label htmlFor='firstName' className={label}>
            First Name:
            <input
              type='text'
              id='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={inputField}
            />
          </label>
          <br />
          <label htmlFor='lastName' className={label}>
            Last Name:
            <input
              type='text'
              id='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className={inputField}
            />
          </label>
          <br />
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
          <label htmlFor='confirmPassword' className={label}>
            Confirm Password:
            <div className='relative'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`${inputField} pr-10`}
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>
          <br />
          <div className='mt-4 space-x-4 text-center'>
            <button
              type='submit'
              className='btn-primary cursor-pointer rounded px-2 py-2 lg:px-6'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
            <button
              onClick={handleBack}
              className='btn-secondary cursor-pointer rounded px-2 py-2 lg:px-6'
            >
              Back to Home
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
