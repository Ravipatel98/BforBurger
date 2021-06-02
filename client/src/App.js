import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ItemListView from "./components/item/ItemListView";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import NavBar1 from "./components/navbar/NavBar1";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import AddItem from "./components/admin/AddItem";
import UpdateItem from "./components/admin/UpdateItem";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar1 />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/items" component={ItemListView} />
            <Route exact path="/items" component={ItemListView} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/addItem" component={AddItem} />
            <Route exact path="/admin/updateItem" component={UpdateItem} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
