import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Item from "./Item";
import "./Item.css";
import { loadItems } from "../../redux/actions/itemActions";

const ItemListView = (props) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const loadItems = async () => {
    try {
      const response = await props.loadItems();
      if (response && response.data && response.data.data) {
        setItems(response.data.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    console.log("Comp mounted");
    loadItems();
  }, []);
  return (
    <>
      <input
        className="item-searchbar"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {items.length > 0 ? (
        items
          .filter((item) => {
            if (search === "") {
              return item;
            } else if (
              item.name.toLowerCase().includes(search.toLocaleLowerCase())
            ) {
              return item;
            } else if (
              item.type.toLowerCase().includes(search.toLocaleLowerCase())
            ) {
              return item;
            }
          })
          .map((task, index) => (
            <Item
              key={index}
              imageUrl={`http://localhost:5000/${task.itemImage}`}
              name={task.name}
              type={task.type}
            />
          ))
      ) : (
        <h2>Great! There is nothing to work</h2>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadItems: () => dispatch(loadItems()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemListView);
