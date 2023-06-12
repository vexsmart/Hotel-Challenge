import React, { useState } from "react";

import Form from "react-bootstrap/Form";

const RoomAdder = (props) => {
  const [roomNum, setRoomNum] = useState("");
  // console.log("addMounted")
  const data = props.httpData;
  const roomNumHandler = (e) => {
    setRoomNum(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();


    //add logic so that you can only add rooms that dont have the same number
    //and is not null.

    for (let i = 0; i < data.length; i++) {
      if (data[i].number == roomNum) {
        return window.alert(`room ${roomNum} already exists`);
      }
    }

    props.fetchPost(null, "POST", {
      id: null,
      status: "LIVRE",
      number: roomNum,
    });
  };

  return (
    <Form onSubmit={submitHandler}>
      <div>
        <label>room number</label>
        <input
          required
          type="number"
          min="1"
          onChange={roomNumHandler}
          max="50"
        />
      </div>
      <div>
        <button type="submit">submit</button>
        <button type="button" onClick={props.onClose}>
          cancel
        </button>
      </div>
    </Form>
  );
};

export default RoomAdder;
