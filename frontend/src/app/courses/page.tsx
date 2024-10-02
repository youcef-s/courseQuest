"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../components/main/navbar';
import Pagination from '../components/sub/pagination';
import CourseTable from '../components/sub/coursestable';

const Courses: React.FC = () => {
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

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div>
      <Navbar
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        onLogout={handleLogout}
      />
      <div className="flex-grow bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <CourseTable />
            </div>
            <Pagination currentPage={3} totalPages={1000} />
          </div>
        </div>
      </div>
    </div>
  );
};



export default Courses;
