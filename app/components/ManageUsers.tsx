"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ManageUsers = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deleteEmail, setDeleteEmail] = useState("");

  const router = useRouter();
  const API_URL = process.env.API_URL ?? "http://localhost:8080/";

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}users/create`, {
        Email: email,
        Password: password,
      });
      if (res.status === 200) {
        alert("User created successfully!");
        setEmail("");
        setPassword("");
      } else {
        throw new Error("Failed to create the user");
      }
    } catch (error) {
      console.error("Error creating the user:", error);
      alert("Failed to create the user");
    }
  };

  const handleDeleteUser = async (e: FormEvent) => {
    e.preventDefault();
    const confirmed = confirm(
      `Do you want to delete the user with email: ${deleteEmail}?`
    );
    if (confirmed) {
      try {
        const res = await axios.delete(`${API_URL}users/delete`, {
          data: { Email: deleteEmail },
        });
        if (res.status === 200) {
          alert("User deleted successfully!");
          setDeleteEmail("");
        } else {
          throw new Error("Failed to delete the user");
        }
      } catch (error) {
        console.error("Error deleting the user:", error);
        alert("Failed to delete the user");
      }
    }
  };

  return (
    <div className='w-full px-4 md:px-10'>
      <div className='my-8 flex justify-center items-center'>
        <h1 className='text-2xl md:text-3xl text-primary font-bold'>
          Manage Users
        </h1>
      </div>

      <div className='border border-gray-300 rounded-lg p-6 mb-8'>
        <h2 className='text-xl font-semibold mb-4 text-gray-800'>
          Create User
        </h2>
        <form className='space-y-4' onSubmit={handleCreateUser}>
          <div className='flex flex-col'>
            <label
              htmlFor='email'
              className='text-lg font-semibold text-gray-700'
            >
              Email:
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full border border-primary-light px-4 py-2 mt-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </label>
            <label
              htmlFor='password'
              className='mt-4 text-lg font-semibold text-gray-700'
            >
              Password:
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-full border border-primary-light px-4 py-2 mt-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </label>
            <div className='mt-4 flex justify-center'>
              <button
                type='submit'
                className='bg-primary flex items-center gap-2 font-bold text-md md:text-lg transition-transform transform hover:scale-105 text-white p-3 rounded-lg shadow-lg'
                disabled={false}
              >
                <span>Create User</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className='border border-gray-300 rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-4 text-gray-800'>
          Delete User
        </h2>
        <form className='space-y-4' onSubmit={handleDeleteUser}>
          <div className='flex flex-col'>
            <label
              htmlFor='deleteEmail'
              className='text-lg font-semibold text-gray-700'
            >
              Email to Delete:
              <input
                type='email'
                id='deleteEmail'
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
                required
                className='w-full border border-primary-light px-4 py-2 mt-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </label>
            <div className='mt-4 flex justify-center'>
              <button
                type='submit'
                className='bg-red-500 flex items-center gap-2 font-bold text-md md:text-lg transition-transform transform hover:scale-105 text-white p-3 rounded-lg shadow-lg'
                disabled={false}
              >
                <span>Delete User</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageUsers;
