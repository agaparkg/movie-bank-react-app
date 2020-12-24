import React from "react";

export default function IsLoading(props) {
  return (
    <div className="spinner-rstrap">
      <img
        id="loading-img"
        src={require("../images/loading.gif").default}
        alt=""
      />
    </div>
  );
}
