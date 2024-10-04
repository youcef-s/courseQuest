"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Home: React.FC = () => {
  const [redirectLink, setRedirectLink] = useState('/signup');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedPreference = localStorage.getItem('darkMode');
      return storedPreference === 'false' ? false : true;
    }
    return true;
  });

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setRedirectLink('/courses');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-between p-6 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center flex-grow text-center z-10">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-200">🌟 Welcome to CourseQuest! 🌟</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          We&apos;re thrilled to have you here! At CourseQuest, we&apos;re all about making your learning journey exciting and enjoyable. Discover a world of knowledge with our wide range of courses, tailored just for you!
        </p>
        <Link href={redirectLink}>
          <button className="mt-4 bg-primary-700 hover:bg-primary-800 text-white font-medium py-3 px-6 rounded-lg focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
            🎓 Get Started
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-center mt-8 z-10">
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
              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${isDarkMode ? 'translate-x-full bg-primary-600' : ''
                }`}
            ></div>
          </div>
          <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
            {isDarkMode
              ? '🌞 How about some brightness for your eyes?'
              : '🌜 A cozy darkness for comfort?'}
          </span>
        </label>
      </div>

      <div className="absolute inset-0 z-[-1] bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
    </div>
  );
};

export default Home;
