import React from "react";
import { apiPostDelete } from "./lookup";

export function ActionBtn(props) {
  const { post, action, didPerformAction } = props;

  const handleActionBackendEvent = (response, status) => {
    if ((status === 200 || status === 201) && didPerformAction) {
      didPerformAction(response, status);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    apiPostDelete(post.id, action.type, handleActionBackendEvent);
  };

  return (
    <button className="btn btn-danger btn-sm" onClick={handleClick}>
      Delete
    </button>
  );
}
