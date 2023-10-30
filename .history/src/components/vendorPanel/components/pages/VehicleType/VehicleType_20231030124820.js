/** @format */

import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";

const VehicleType = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}vehicle-type`);
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [loadWeight, setLoadWeight] = useState("");
    const [baseFare, setBaseFare] = useState("");
    const [pricePerKm, setPricePerKm] = useState("");
    const [pricePerMin, setPricePerMin] = useState("");
    const [dimensionImage, setDimesionImage] = useState("");
    const [image, setImage] = useState("");
    const [wheels, setWheels] = useState("");
    const [roadClearance, setRoadClearance] = useState("");

    const payload = {
      name,
      loadWeight,
      baseFare,
      pricePerKm,
      pricePerMin,
      dimensionImage,
      image,
      wheels,
      roadClearance,
    };

    const postthumbImage = (e, type) => {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (type === "dimension") {
            setDimesionImage(data.url);
          } else {
            setImage(data.url);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`${Baseurl}vehicle-type`);
        console.log(data);
        fetchData();
        props.onHide();
        toast.success("Category Added");
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              color: "black",
              margin: "auto",
            }}
            onSubmit={postData}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Banner"
                required
                onChange={(e) => setDesc(e.target.value)}
                onClick={() => postthumbImage()}
              />
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}vehicle-type/${id}`, Auth);
      const msg = "Vehicle Type Deleted";
      showMsg("Success", msg, "success");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Vehicle Type
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
          >
            Create New
          </Button>
        </div>

        <div className="Table_Component">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Dimension Image</th>
                <th>Name</th>
                <th>Load Weight</th>
                <th>Base Fare</th>
                <th>Price / Km</th>
                <th>Price / Min</th>
                <th>Wheels </th>
                <th>Lowercase Name</th>
                <th>Road Clearance</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={i.image}
                      alt="CategoryImage"
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>
                    <img
                      src={i.dimensionImage}
                      alt="CategoryImage"
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td> {i.name} </td>
                  <td> {i.loadWeight} </td>
                  <td> {i.baseFare} </td>
                  <td> {i.pricePerKm} </td>
                  <td> {i.pricePerMin} </td>
                  <td> {i.wheels} </td>
                  <td> {i.lowercaseName} </td>
                  <td> {i.roadClearance} </td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <AiFillDelete
                        color="red"
                        cursor={"pointer"}
                        onClick={() => deleteData(i.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(VehicleType);
