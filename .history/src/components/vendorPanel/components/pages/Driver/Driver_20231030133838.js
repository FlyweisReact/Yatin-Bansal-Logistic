/** @format */

import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";

const Driver = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}driver/all`, Auth);
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Driver
          </span>
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
                  <td> {i.phoneNumber} </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Driver);
