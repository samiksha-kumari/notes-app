import React from "react";

function ListItem(props) {
  console.log(props);
  return (
    <li>
      {props.name}
      <button
        onClick={() => {
          const confirm = window.confirm("Are You Sure?");
          if (confirm) {
            props.handleRemove(props._id);
          }
        }}
      >
        remove
      </button>
    </li>
  );
}

export default ListItem;
