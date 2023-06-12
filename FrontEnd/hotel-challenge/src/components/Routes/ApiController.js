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
  const [modal, setModal] = useState({
    update: false,
    add: false,
    delete: false,
  });

  const [data, setData] = useState([]);

  const toggleModal = (modal) => {
    setModal((prevState) => ({
      ...prevState,
      [modal]: !prevState[modal],
    }));
  };

  // re-render table logic for each method
  const tableUpdate = async (res, id, method, inputData) => {
    // console.log(res);
    // console.log(id);
    // console.log(method);
    // console.log(inputData);
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

        toggleModal("add");
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

          toggleModal("delete");
          return prevData;
        });
        return;
      case "PUT":
        let index;
        setData((prevData) => {
          prevData.forEach((element, i) => {
            if (id == element.id) {
              index = i;
            }
          });
          prevData[index].status = inputData.status;
          toggleModal("update");
          return prevData;
        });
        // console.log(data);
        return;
      default:
        return data;
    }
  };

  //fetch
  //inputData must be an object
  const fetchData = async (id = "", method = "GET", inputData = null) => {
    const url = id ? `${API_URL}/${id}` : API_URL;

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

  const closeModalHandler = (modal) => {
    toggleModal(modal);
  };

  const openModalHandler = (modal) => {
    toggleModal(modal);
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
    <Modal onClose={() => closeModalHandler("update")}>
      <Card>
        <RoomUpdater
          fetchUpdate={fetchData}
          httpData={data}
          onClose={() => closeModalHandler("update")}
        />
      </Card>
    </Modal>
  );

  const roomAdder = (
    <Modal onClose={() => closeModalHandler("add")}>
      <Card>
        <RoomAdder
          fetchPost={fetchData}
          httpData={data}
          onClose={() => closeModalHandler("add")}
        />
      </Card>
    </Modal>
  );

  const roomDeleter = (
    <Modal onClose={() => closeModalHandler("delete")}>
      <Card>
        <RoomDeleter
          fetchDelete={fetchData}
          httpData={data}
          onClose={() => closeModalHandler("delete")}
        />
      </Card>
    </Modal>
  );

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
            <button
              className="action-button"
              onClick={() => openModalHandler("add")}
            >
              Add Room
            </button>
          </div>
          <div className="button-container_PUT">
            <button
              type="button"
              onClick={() => openModalHandler("update")}
              className="action-button"
            >
              Update Room
            </button>
          </div>
          <div className="button-container_DELETE">
            <button
              className="action-button"
              onClick={() => openModalHandler("delete")}
            >
              Delete Data
            </button>
          </div>
        </div>
        {hasData ? (
          datalist
        ) : (
          <p style={{ textAlign: "center", color: "black" }}>Get data!</p>
        )}
      </div>
      {modal.update && roomUpdater}
      {modal.delete && roomDeleter}
      {modal.add && roomAdder}
    </Card>
  );
};

export default ApiController;
