import React, { useState } from 'react';
import Table from './Table';
import Modal from './Modal';
import Card from './Card';
import RoomUpdater from './RoomUpdater';
import RoomAdder from './RoomAdder';
import RoomDeleter from './RoomDeleter';

const ApiController = () => {
  const [data, setData] = useState([]);
  const [modals, setModals] = useState({
    update: false,
    add: false,
    delete: false,
  });

  const toggleModal = (modal) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modal]: !prevModals[modal],
    }));
  };

  const tableUpdate = (res, id, method, inputData) => {
    console.log(res);
    console.log(id);
    console.log(method);
    console.log(inputData);

    let resData;
    switch (method) {
      case 'GET':
        resData = await res.json();
        setData(resData);
        break;
      case 'POST':
        resData = await res.json();
        setData((prevData) => [...prevData, resData]);
        toggleModal('add');
        break;
      case 'DELETE':
        setData((prevData) => {
          const index = prevData.findIndex((element) => element.id === id);
          if (index !== -1) {
            prevData.splice(index, 1);
          }
          return prevData;
        });
        toggleModal('delete');
        break;
      case 'PUT':
        setData((prevData) => {
          const index = prevData.findIndex((element) => element.id === id);
          if (index !== -1) {
            prevData[index].status = inputData.status;
          }
          return prevData;
        });
        toggleModal('update');
        break;
      default:
        return;
    }
  };

  const fetchData = async (id = '', method = 'GET', inputData = null) => {
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body:
          method === 'GET' || method === 'DELETE'
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
      window.alert('Something went wrong: ' + error);
    }
  };

  const closeModalHandler = (modal) => {
    toggleModal(modal);
  };

  const openModalHandler = (modal) => {
    toggleModal(modal);
  };

  const hasData = data.length !== 0;

  const renderTable = () => (
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

  const renderModal = (modal, Component) => (
    <Modal onClose={() => closeModalHandler(modal)}>
      <Card>
        <Component
          fetchMethod={fetchData}
          httpData={data}
          onClose={() => closeModalHandler(modal)}
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
            <button className="action-button" onClick={() => openModalHandler('add')}>
              Add Room
            </button>
          </div>
          <div className="button-container_PUT">
            <button
              type="button"
              onClick={() => openModalHandler('update')}
              className="action-button"
            >
              Update Room
            </button>
          </div>
          <div className="button-container_DELETE">
            <button className="action-button" onClick={() => openModalHandler('delete')}>
              Delete Data
            </button>
          </div>
          <div className="button-container_DELETE">
            <button className="action-button" onClick={() => console.log(data)}>
              console
            </button>
          </div>
        </div>
        {hasData ? (
          renderTable()
        ) : (
          <p style={{ textAlign: 'center', color: 'black' }}>Get data!</p>
        )}
      </div>
      {modals.update && renderModal('update', RoomUpdater)}
      {modals.add && renderModal('add', RoomAdder)}
      {modals.delete && renderModal('delete', RoomDeleter)}
    </Card>
  );
};

export default ApiController;