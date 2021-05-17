import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import ItemListView from "./components/item/ItemListView";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h3>Hey, there!</h3>
        <ItemListView />
      </div>
    </Provider>
  );
};

export default App;
