import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const signUpApi = async (userData: {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  try {
    const response = await apiClient.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signInApi = async (userData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await apiClient.get("/user/profile");
    return response.data
  } catch (error) {
    throw error;
  }
};

export const getCourses = async (page: number = 1, limit: number = 20) => {
  try {
    const response = await apiClient.get(`/course?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchCourses = async (
  page: number = 1,
  limit: number = 20,
  query: string,
) => {
  try {
    const response = await apiClient.post(
      `/course/search?page=${page}&limit=${limit}`,
      { query: query },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCourse = async (course: {
  title: string;
  schedule: string;
  description: string;
  instructor: string;
}) => {
  try {
    const response = await apiClient.post("/course/create", course);
    return response.data;
  } catch (error) {
    throw error;
  }
};
