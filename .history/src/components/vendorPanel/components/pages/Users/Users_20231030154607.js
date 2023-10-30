/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl, Auth } from "../../../../../Baseurl";

const Users = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${Baseurl}user/all`, Auth);
      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  console.log(data);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:5004/api/v1/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      toast.success(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Users ( Total : {data?.total} )
          </span>
        </div>
        {/* Add Form */}

        <div style={{ maxWidth: "100%", overflow: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Country Code</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={i.profileImage}
                      alt=""
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{i.name}</td>
                  <td>{i.phoneNumber}</td>
                  <td>{i.countryCode}</td>
                  <td>
                    <AiFillDelete
                      color="red"
                      cursor={"pointer"}
                      onClick={() => deleteData(i._id)}
                    />
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
export default HOC(Users);
