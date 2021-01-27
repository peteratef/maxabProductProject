import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import productReducer from "./components/reducers/productReducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

const store = createStore(productReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
