import { createStore, combineReducers } from "redux";
import themeReducer from "./reducers";
const rootReducer = combineReducers({
    theme: themeReducer,
});
// const configureStore = () => {
//     return createStore(rootReducer);
// };
// export default configureStore;
// const configureStore = () => {
//     return
// };
const store = createStore(rootReducer);
export default store;
