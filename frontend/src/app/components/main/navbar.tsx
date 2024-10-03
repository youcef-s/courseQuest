import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { searchCoursesThunk } from '../../../store/slices/courseSlice';
import { AppDispatch } from '../../../store/store';
import { fetchUserProfile, createCourse } from '../../../lib/api';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
  onLogout: () => void;
  page: number;
  limit: number;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, onToggleDarkMode, isDarkMode, onLogout, page, limit }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [course, setCourse] = useState({ title: '', schedule: '', description: '' });

  const [user, setUser] = useState({
    _id: '',
    username: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userprofile = await fetchUserProfile();
        setUser(userprofile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUser();
  }, []);


  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchCoursesThunk({ page: page, limit: limit, query: searchQuery }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createCourse({
        title: course.title,
        schedule: course.schedule,
        description: course.description,
        instructor: user.firstName + ' ' + user.lastName
      });
      setModalOpen(false);
      setCourse({ title: '', schedule: '', description: '' });
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCourse({ title: '', schedule: '', description: '' });
  };

  return (
    <div>
      <nav className="bg-gray-100 dark:bg-gray-800 px-4 py-3 shadow-md w-full flex justify-between items-center">
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
          <form className="flex items-center" onSubmit={handleSearchSubmit}>
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <IoSearchSharp
                  onClick={handleSearchSubmit}
                  className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                />
              </div>
              <input
                type="text"
                id="simple-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search for a course or a teacher"
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
            <h2 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">🌟 Let’s Add a New Course!</h2>
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
                  className="p-2 mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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
                  className="p-2 mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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
                  className="p-2 mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md mr-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
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
