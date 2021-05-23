import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ItemListView from "./components/item/ItemListView";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/Home";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/items" component={ItemListView} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
