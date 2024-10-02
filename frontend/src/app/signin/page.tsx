"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const SignIn: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedPreference = localStorage.getItem('darkMode');
      return storedPreference === 'false' ? false : true;
    }
    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:px-5 antialiased min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg px-8 py-4 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-200 text-center">Welcome Back!</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
          Please enter your credentials to sign in.
        </p>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-primary-700 hover:bg-primary-800 text-white font-medium py-2 rounded-lg focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary-600 hover:underline dark:text-primary-500">
            Sign up here!
          </Link>
        </p>

        <div className="flex items-center justify-center mt-4">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="hidden"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                aria-label="Toggle Dark Mode"
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isDarkMode ? 'translate-x-full bg-primary-600' : ''
                  }`}
              ></div>
            </div>
            <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
