import Main from "./Main";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux-store/store";

export default function App() {
    return (
        <ReduxProvider store={store}>
            <Main />
        </ReduxProvider>
    );
}
