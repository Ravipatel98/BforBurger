import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadItems } from "../../redux/actions/itemActions";

const ItemListView = (props) => {
  const [items, setItems] = useState([]);
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
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Type</th>
            <th>Time to prep</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>{task.type}</td>
                <td>{task.timeToPrep}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Great! There is nothing to work</td>
            </tr>
          )}
        </tbody>
      </table>
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
