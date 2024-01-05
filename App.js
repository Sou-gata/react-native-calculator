import { useEffect } from "react";
import RNBootSplash from "react-native-bootsplash";
import State from "./Context";
import Main from "./Main";

const App = () => {
    useEffect(() => {
        setTimeout(() => {
            RNBootSplash.hide({ fade: true });
        }, 1500);
    }, []);
    return (
        <State>
            <Main />
        </State>
    );
};

export default App;
