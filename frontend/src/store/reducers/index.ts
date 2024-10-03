import { combineReducers } from "redux";
import userReducer from "../slices/userSlice";
import courseReducer from "../slices/courseSlice";

const rootReducer = combineReducers({
  user: userReducer,
  course: courseReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export { rootReducer };
