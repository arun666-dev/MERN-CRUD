import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Detail = () => {
  const navigate = useNavigate();
  const [getSingleData, setGetSingleData] = useState([]);

  const { id } = useParams();
  console.log(id);

  const getData = async () => {
    const res = await fetch(`/getData/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (res.status === 404 || !data) {
      alert("error");
    } else {
      setGetSingleData(data);
      console.log("single data fetched: ", data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = async (id) => {
    const res = await fetch(`/deleteUser/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.status === 404 || !data) {
      console.log("error");
    } else {
      console.log("user deleted: ", data);
      navigate("/");
    }
  };

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome {getSingleData.name}</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${getSingleData._id}`}>
              <button className="btn btn-primary mx-2">
                <EditIcon />
              </button>
            </NavLink>
            <button
              className="btn btn-danger mx-2"
              onClick={() => deleteUser(getSingleData._id)}
            >
              <DeleteIcon />
            </button>
          </div>
          <div className="row">
            <div className="left-view col-lg-6 col-md-6 col-12">
              <AccountBoxIcon />
              <p className="mt-3">
                Name: <span>{getSingleData.name}</span>
              </p>
              <p className="mt-3">
                Age: <span>{getSingleData.age}</span>
              </p>
              <p className="mt-3">
                <EmailIcon />
                Email: <span>{getSingleData.email}</span>
              </p>
              <p className="mt-3">
                <WorkIcon />
                Occupation: <span>{getSingleData.work}</span>
              </p>
            </div>
            <div className="right-view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <PhoneAndroidIcon />
                Mobile: <span>{getSingleData.mobile}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon />
                Location: <span>{getSingleData.address}</span>
              </p>
              <p>
                <DescriptionIcon />
                Description:
                <span>{getSingleData.desc}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
