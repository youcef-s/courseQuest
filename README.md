# 📚 CourseQuest: Your Ultimate Course Management System

Welcome to **CourseQuest**! 🎉 This web application allows users to effortlessly manage courses, making learning accessible and organized. Dive in and explore the features that make CourseQuest a fantastic platform for students and educators alike!

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**
- **Docker**

### Installation

```bash
 git clone https://github.com/yourusername/coursequest.git
 cd coursequest
 docker-compose up --build
```

Now you can access the app at [http://localhost:3000](http://localhost:3000)!

## 🌟 Features

- **User Authentication**: Secure login using JWT to ensure your data is safe.
- **Course Management**: Add new courses with essential details like title, description, teacher, and schedule.
- **Course Listing**: View all courses in a neat list format and click on any course to see more details.
- **Search & Filter**: Quickly find courses by title or teacher, making navigation a breeze!
- **Responsive Design**: Enjoy a seamless experience on all devices, from desktops to mobile phones.
- **Dark Mode**: Toggle between light and dark modes for a personalized user experience.
- **State Management with Redux**: Efficiently manage application state to keep track of user actions and course data.

## 💾 Big Data Challenge

Our app is built to handle a massive dataset of over 10,000 courses! Here’s how we tackle this:

- **Pagination**: Efficiently display courses in manageable chunks to enhance loading times.
- **Optimized Queries**: Utilized MongoDB indexing for quick data retrieval.
- **Fast Search & Filter**: Implemented efficient algorithms to maintain quick responses, even with a vast number of courses.

## 📖 User Guide

### How to Use CourseQuest

1. **Log In**: Use your credentials to access the app.
2. **Add Courses**: Click on the "Add Course" button and fill out the form. Don’t forget to provide all necessary information!
3. **Browse Courses**: View the list of all available courses and click on a course for more details.
4. **Search & Filter**: Use the search bar to find specific courses or filter them by teacher or title.