import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Admin.css";
import ItemAdminView from "./ItemAdminView";
import UserAdminView from "./UserAdminView";
import { loadItems, deleteItem } from "../../redux/actions/itemActions";

const Admin = ({ loadItems, deleteItem }) => {
  const [toggleState, setToggleState] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await loadItems();
      setItems(fetchedItems.data.data);
    };
    fetchItems();
  }, [loadItems, items]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const removeItem = (id) => {
    deleteItem(id).then((res) => {
      console.log(res);
      loadItems();
    });
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Item
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          User
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Report
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <ItemAdminView items={items} removeItem={removeItem} />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <UserAdminView />
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Content 3</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
            nostrum rerum laudantium totam unde adipisci incidunt modi alias!
            Accusamus in quia odit aspernatur provident et ad vel distinctio
            recusandae totam quidem repudiandae omnis veritatis nostrum
            laboriosam architecto optio rem, dignissimos voluptatum beatae
            aperiam voluptatem atque. Beatae rerum dolores sunt.
          </p>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadItems: () => dispatch(loadItems()),
    deleteItem: (id) => dispatch(deleteItem(id)),
  };
};

export default connect(null, mapDispatchToProps)(Admin);
