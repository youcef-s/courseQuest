"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { fetchCourseData, searchCoursesThunk } from '../../store/slices/courseSlice';
import { RootState, AppDispatch } from '../../store/store';
import { useRouter } from 'next/navigation';

const Navbar = dynamic(() => import('../components/main/navbar'), { ssr: false });
const Pagination = dynamic(() => import('../components/sub/pagination'), { ssr: false });
const CourseTable = dynamic(() => import('../components/sub/coursestable'), { ssr: false });

const Courses: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { courses, error, totalPages } = useSelector((state: RootState) => state.course);

  const router = useRouter();
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

  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchCoursesThunk({ page: currentPage, limit: 20, query: searchQuery }));
    } else {
      dispatch(fetchCourseData({ page: currentPage, limit: 20 }));
    }
  }, [currentPage, dispatch, searchQuery]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    router.push('/');
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Oops! </strong>
        <span className="block sm:inline">There was an error fetching courses: {error}</span>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        onLogout={handleLogout}
        page={currentPage}
        limit={20}
      />
      <div className="flex-grow bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <CourseTable courses={courses} />
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages ? totalPages : 1}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
