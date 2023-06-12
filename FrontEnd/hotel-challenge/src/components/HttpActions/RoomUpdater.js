import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { FormSelect } from "react-bootstrap";

// const API_URL = "http://localhost:8080/apartments";

const RoomUpdater = (props) => {
  const [roomIdValue, setRoomIdValue] = useState("");
  const [RoomStatusValue, setRoomStatusValue] = useState("");

  const numberInputHandler = (e) => {
    setRoomIdValue(e.target.value);
  };

  const roomStatusHandler = (e) => {
    setRoomStatusValue(e.target.value);
  };

  const propData = props.httpData;

  const submitHandler = (e) => {
    e.preventDefault();
    props.fetchUpdate(roomIdValue, "PUT", {
      status: RoomStatusValue,
    });
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label>choose a roomID</Form.Label>
        <FormSelect
          required
          onChange={numberInputHandler}
          type="number"
          min="1"
          max="10"
        >
          <option>Select ID</option>
          {propData.map((item) => (
            <option key={item.id} value={item.id}>
              {item.id}
            </option>
          ))}
        </FormSelect>
      </Form.Group>
      <div>
        <label>room status</label>
        <FormSelect
          required
          onChange={roomStatusHandler}
          aria-label="Default select example"
        >
          <option>Choose Status</option>
          <option value="LIVRE">LIVRE</option>
          <option value="LOCADO">LOCADO</option>
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

export default RoomUpdater;
