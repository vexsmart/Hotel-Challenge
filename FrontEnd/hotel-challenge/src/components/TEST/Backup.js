import React, { useState } from "react";
import Table from "react-bootstrap/Table";

import "./ApiController.css";
import Modal from "../UI/Modal";
import RoomUpdater from "../HttpActions/RoomUpdater";
import Card from "../UI/Card";
import RoomDeleter from "../HttpActions/RoomDeleter";
import RoomAdder from "../HttpActions/RoomAdder";

const API_URL = "http://localhost:8080/apartments";

const ApiController = () => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [deleteModalIsShown, setDeleteModalIsShown] = useState(false);
  const [addModalIsShown, setAddModalIsShown] = useState(false);

  // const [objModalShown, setObjModalShown] = useState({
  //   GET: false,
  // })
  // objModalShown[method] objModalShown.GET

  // setObjModalShown((prevState) => {
  //    prevState[method] = true
  //    return prevState
  // })

  const [data, setData] = useState([]);

  // re-render table logic for each method
  const tableUpdate = async (res, id, method, inputData) => {
    console.log(res);
    console.log(id);
    console.log(method);
    console.log(inputData);
    let resData;
    switch (method) {
      case "GET":
        resData = await res.json();
        setData(resData);
        return;
      case "POST":
        resData = await res.json();
        setData((prevData) => {
          return [...prevData, resData];
        });
        setAddModalIsShown(false)
        return;
      case "DELETE":
        setData((prevData) => {
          let index;
          prevData.forEach((element, i) => {
            if (id == element.id) {
              index = i;
            }
          });
          prevData.splice(index, 1);
          setDeleteModalIsShown(false)
          return prevData;
        });
        return;
      case "PUT":
        let index;
        setData((prevData) => {
          prevData.forEach((element, i) => {
            if (id == element.id) {
              console.log("entered if statement");
              index = i;
            }
          });
          prevData[index].status = inputData.status;
          setModalIsShown(false)
          return prevData;
        });
        console.log(data);
        return;
      default:
        return data;
    }
  };

  //fetch
  //inputData must be an object
  const fetchData = async (id = "", method = "GET", inputData = null) => {
    let url;
    if (!id) {
      url = API_URL;
    } else {
      url = `${API_URL}/${id}`;
    }

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body:
          method === "GET" || method === "DELETE"
            ? undefined
            : JSON.stringify(inputData),
      });
      if (!res.ok) {
        return window.alert(`Invalid call`);
      } else {
        tableUpdate(res, id, method, inputData);
      }
    } catch (error) {
      console.log(error);
      window.alert("something went wrong" + error);
    }
  };

  //handlers

  const closeUPModalHandler = () => {
    setModalIsShown(false);
  };

  const openUPModalHandler = () => {
    setModalIsShown(true);
  };

  const closeADDModalHandler = () => {
    setAddModalIsShown(false);
  };

  const openADDModalHandler = () => {
    setAddModalIsShown(true);
  };

  const closeDELModalHandler = () => {
    setDeleteModalIsShown(false);
  };

  const openDELModalHandler = () => {
    setDeleteModalIsShown(true);
  };

  ////////////////////////////////////////////////////////////
  const hasData = data.length !== 0;

  const datalist = (
    <Table>
      <thead>
        <tr>
          <th>#Room ID</th>
          <th>Room Status</th>
          <th>Room number</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <th>{item.id}</th>
            <th>{item.status}</th>
            <th>{item.number}</th>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const roomUpdater = (
    <Modal onClose={closeUPModalHandler}>
      <Card>
        <RoomUpdater
          fetchUpdate={fetchData}
          httpData={data}
          onClose={closeUPModalHandler}
        />
      </Card>
    </Modal>
  );

  const roomAdder = (
    <Modal onClose={closeADDModalHandler}>
      <Card>
        <RoomAdder
          fetchPost={fetchData}
          httpData={data}
          onClose={closeADDModalHandler}
        />
      </Card>
    </Modal>
  );

  const roomDeleter = (
    <Modal onClose={closeDELModalHandler}>
      <Card>
        <RoomDeleter
          fetchDelete={fetchData}
          httpData={data}
          onClose={closeDELModalHandler}
        />
      </Card>
    </Modal>
  );

  const logConsole = () => {
    console.log(data);
  };

  return (
    <Card>
      <div className="api-controller">
        <h2>API Controller</h2>
        <div className="button-container">
          <div className="button-container_GET">
            <button className="action-button" onClick={() => fetchData()}>
              Get Data
            </button>
          </div>
          <div className="button-container_POST">
            <button className="action-button" onClick={openADDModalHandler}>
              Add Room
            </button>
          </div>
          <div className="button-container_PUT">
            <button
              type="button"
              onClick={openUPModalHandler}
              className="action-button"
            >
              Update Room
            </button>
          </div>
          <div className="button-container_DELETE">
            <button className="action-button" onClick={openDELModalHandler}>
              Delete Data
            </button>
          </div>
          <div className="button-container_DELETE">
            <button className="action-button" onClick={logConsole}>
              console
            </button>
          </div>
        </div>
        {hasData ? (
          datalist
        ) : (
          <p style={{ textAlign: "center", color: "black" }}>Get data!</p>
        )}
      </div>
      {modalIsShown && roomUpdater}
      {deleteModalIsShown && roomDeleter}
      {addModalIsShown && roomAdder}
    </Card>
  );
};

export default ApiController;
