import { useEffect } from "react";
import RNBootSplash from "react-native-bootsplash";
import ContextProvider from "./Context";
import Main from "./Main";

const App = () => {
    useEffect(() => {
        setTimeout(() => {
            RNBootSplash.hide({ fade: true });
        }, 1500);
    }, []);

    return (
        <ContextProvider>
            <Main />
        </ContextProvider>
    );
};

export default App;
