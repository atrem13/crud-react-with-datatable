import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";

import App from "./App";
import "./styles/tailwind.css";

const store = createStore(rootReducer, composeWithDevTools());
const MainApp = () => {
  return (
    <>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
  rootElement
);
