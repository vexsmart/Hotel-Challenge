import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import { FormSelect } from "react-bootstrap";

const RoomDeleter = (props) => {
  const [roomId, setRoomId] = useState("");

  const data = props.httpData;
  // console.log("DELETERMOUNTED")
  const roomIdHandler = (e) => {
    setRoomId(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    props.fetchDelete(roomId, "DELETE", undefined);
  };

  return (
    <Form onSubmit={submitHandler}>
      <div>
        <label>room number</label>
        <FormSelect
          onChange={roomIdHandler}
          aria-label="Default select example"
        >
          <option>Choose roomID</option>
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.id}
            </option>
          ))}
        </FormSelect>
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

export default RoomDeleter;
