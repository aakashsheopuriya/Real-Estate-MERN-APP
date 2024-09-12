import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataCard from "../../../components/card/DataCard";
import { Button, Popconfirm,message } from "antd";
import SinglePropertyPage from "./SinglePropertyPage";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("id", id);
  const [property, setProperty] = useState({});
  const getSpecificPropertyDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/common/api/get-property/${id}`
    );
    console.log("backend res", res);
    if (res.data.property) {
      setProperty(res.data.property);
    } else {
      navigate("/dashboard/my-property");
      setProperty([]);
    }
  };
  const handleDelete = async (id) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/property-delete/${id}`
    );
    console.log("res", res.data.message);
    getSpecificPropertyDetails();
  };

  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };
  useEffect(() => {
    getSpecificPropertyDetails();
  }, []);
  return (
    <div className="">
      <div>
        property details
        <div className="">{/* <BreadCrumbs items={items} /> */}</div>
        <div>
          {/* <DataCard data={property} /> */}
          <SinglePropertyPage data={property}/>
        </div>
        <div>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={()=>handleDelete(id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
        <button><Link to={`/dashboard/property/${id}/edit`}>Edit</Link></button>
      </div>
      <div></div>
    </div>
  );
}
