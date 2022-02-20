import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Edit = () => {
  const navigate = useNavigate();

  const [inp, setInp] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    desc: "",
  });
  // const [getSingleData, setGetSingleData] = useState([]);
  // console.log(getSingleData);

  const setData = (event) => {
    // console.log(event.target.value)
    const { name, value } = event.target;
    setInp((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const { id } = useParams();
  console.log(id);

  const getData = async () => {
    const res = await fetch(`/getData/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 404 || !data) {
      alert("error");
    } else {
      console.log("single data fetched: ", data);
      setInp(data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const updateUser = async (event) => {
    event.preventDefault();
    const { name, email, age, mobile, work, address, desc } = inp;
    const res = await fetch(`/updateUser/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, age, mobile, work, address, desc }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      alert("fill the data");
    } else {
      console.log("data updated: ", data);
      navigate("/");
    }
  };

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>
      <form className="mt-5">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="name"
              value={inp.name}
              onChange={setData}
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              email
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputPassword1"
              name="email"
              value={inp.email}
              onChange={setData}
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              age
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleInputPassword1"
              name="age"
              value={inp.age}
              onChange={setData}
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              mobile
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleInputPassword1"
              name="mobile"
              value={inp.mobile}
              onChange={setData}
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Work
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              name="work"
              value={inp.work}
              onChange={setData}
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Address
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              name="address"
              value={inp.address}
              onChange={setData}
            />
          </div>
          <div class="mb-3 col-lg-12 col-md-12 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Description
            </label>
            <textarea
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              cols="10"
              rows="5"
              name="desc"
              value={inp.desc}
              onChange={setData}
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary" onClick={updateUser}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
