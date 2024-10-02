import { useState } from "react";

interface Course {
  id: number;
  title: string;
  instructor: string;
  schedule: string;
  description: string;
}

const CourseTable: React.FC = () => {
  const courses: Course[] = [
    {
      id: 1,
      title: 'Creative Approaches to Bandwidth Management',
      instructor: 'Beth Williamson',
      schedule: 'Tuesday 10:00',
      description: 'Dive into innovative strategies for managing bandwidth in today\'s tech landscape.',
    },
    {
      id: 2,
      title: "Unlocking Neural Networks: A Hands-On Guide",
      instructor: "Hannah Ward",
      schedule: "Thursday 1:00",
      description: "Explore the fascinating world of neural networks and their practical applications.",
    },
    {
      id: 3,
      title: "Understanding Hierarchies in Modern Organizations",
      instructor: "Regina Ford",
      schedule: "Wednesday 1:00",
      description: "Learn about the dynamics of organizational hierarchies and how they impact decision-making.",
    },
    {
      id: 4,
      title: "Strategies for Effective Digital Management",
      instructor: "Michael Meyers Jr.",
      schedule: "Thursday 2:00",
      description: "Master the art of digital strategy and learn to navigate the complexities of online management.",
    },
  ];

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
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-4 md:px-6">Course Title</th>
            <th scope="col" className="px-4 py-4 md:px-6">Instructor</th>
            <th scope="col" className="px-4 py-4 md:px-6">Schedule</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" onClick={() => handleOpenModal(course)}>
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
