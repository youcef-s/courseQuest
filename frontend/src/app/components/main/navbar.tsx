import React, { useState } from 'react';
import { FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { IoSearchSharp } from "react-icons/io5";

interface NavbarProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleDarkMode, isDarkMode, onLogout }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [course, setCourse] = useState({ title: '', schedule: '', description: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Course submitted:', course);
    setModalOpen(false);
    setCourse({ title: '', schedule: '', description: '' });
  };

  const closeModal = () => {
    setModalOpen(false);
    setCourse({ title: '', schedule: '', description: '' });
  };

  return (
    <div>
      <nav className="bg-white dark:bg-gray-800 p-4 shadow-md w-full transition-all duration-300 flex justify-between items-center">
        <button
          onClick={onToggleDarkMode}
          className="flex items-center px-3 py-3 sm:py-2 sm:px-4 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          {isDarkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
          <span className="hidden sm:block">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        <div className="flex-grow px-4">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IoSearchSharp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search"
                required
              />
            </div>
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center text-white bg-green-600 hover:bg-green-700 px-3 py-3 sm:py-2 sm:px-4 rounded-lg"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            <span className="hidden sm:block ml-2">Add a Course</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center justify-center px-3 py-3 sm:py-2.5 sm:px-4 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg"
          >
            <FaSignOutAlt />
            <span className="hidden sm:block ml-2">Logout</span>
          </button>
        </div>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h2 className="text-white text-lg font-semibold mb-4">🌟 Let’s Add a New Course!</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Please fill in the details below:</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={course.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter course title"
                  className="p-2 mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Schedule</label>
                <input
                  type="text"
                  name="schedule"
                  id="schedule"
                  value={course.schedule}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Monday 10:00"
                  className="p-2 mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={course.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Provide a brief description of the course"
                  className="p-2 mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
