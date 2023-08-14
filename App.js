import Main from "./Main";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux-store/store";

const App = () => {
    return (
        <ReduxProvider store={store}>
            <Main />
        </ReduxProvider>
    );
};

export default App;
