import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCourses, searchCourses } from "../../lib/api";

interface CourseData {
  _id: number;
  title: string;
  schedule: string;
  description: string;
  instructor: string;
}

interface FetchCoursesResponse {
  total: number;
  courses: CourseData[];
}

interface CourseState {
  courses: CourseData[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
  totalPages: 1,
};

export const fetchCourseData = createAsyncThunk(
  "course/fetchCourseData",
  async (params: { page?: number; limit?: number }) => {
    const { page = 1, limit = 20 } = params;
    return await getCourses(page, limit);
  },
);

export const searchCoursesThunk = createAsyncThunk(
  "course/searchCourses",
  async (params: { page?: number; limit?: number; query: string }) => {
    const { page = 1, limit = 20, query } = params;
    return await searchCourses(page, limit, query);
  },
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCourseData.fulfilled,
        (state, action: PayloadAction<FetchCoursesResponse>) => {
          state.loading = false;
          state.courses = action.payload.courses;
          state.totalPages = action.payload.total;
        },
      )
      .addCase(fetchCourseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch course data";
      })
      .addCase(searchCoursesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchCoursesThunk.fulfilled,
        (state, action: PayloadAction<FetchCoursesResponse>) => {
          state.loading = false;
          state.courses = action.payload.courses;
          state.totalPages = action.payload.total;
        },
      )
      .addCase(searchCoursesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search courses";
      });
  },
});

export default courseSlice.reducer;
