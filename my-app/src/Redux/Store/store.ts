import { createStore } from "redux";
import rootReducer from "../Reducers/reducer";
const store = createStore(rootReducer);
export default store;