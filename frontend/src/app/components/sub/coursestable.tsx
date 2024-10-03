import { useState } from "react";

interface Course {
  _id: number;
  title: string;
  instructor: string;
  schedule: string;
  description: string;
}

interface CourseTableProps {
  courses: Course[];
}

const CourseTable: React.FC<CourseTableProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-4 md:px-6">Course Title</th>
            <th scope="col" className="px-4 py-4 md:px-6">Instructor</th>
            <th scope="col" className="px-4 py-4 md:px-6">Schedule</th>
          </tr>
        </thead>
        <tbody>
          {courses && courses.map((course) => (
            <tr key={course._id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" onClick={() => handleOpenModal(course)}>
              <td className="px-4 py-3 md:px-6">{course.title}</td>
              <td className="px-4 py-3 md:px-6">{course.instructor}</td>
              <td className="px-4 py-3 md:px-6">{course.schedule}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50 p-4">
          <div className="bg-gray-200 rounded-lg p-6 shadow-lg w-full md:w-1/2 dark:bg-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">{selectedCourse.title}</h2>
            <p className="mb-4 text-gray-800 dark:text-gray-300"><strong>Instructor:</strong> {selectedCourse.instructor}</p>
            <p className="mb-4 text-gray-800 dark:text-gray-300"><strong>Scheduled On:</strong> {selectedCourse.schedule}</p>
            <p className="text-gray-800 dark:text-gray-300">{selectedCourse.description}</p>
            <button
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseTable;
