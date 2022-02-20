const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// router.get("/", (req, res) => {
//   console.log("connect");
// });

// register user
router.post("/register", async (req, res) => {
  // console.log(req.body);

  const { name, email, age, mobile, work, address, desc } = req.body;
  if (!name || !email || !age || !mobile || !work || !address || !desc) {
    return res.status(400).json("plz fill the data");
  }
  try {
    const preUser = await users.findOne({
      email,
    });
    console.log(preUser);
    if (preUser) {
      return res.status(404).send("this user is already present");
    } else {
      const addUser = await new users({
        name,
        email,
        age,
        mobile,
        work,
        address,
        desc,
      });
      await addUser.save();
      res.status(201).json(addUser);
      console.log(addUser);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// get user data
router.get("/getData", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(200).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(400).json(error);
  }
});

// get indi. user
router.get("/getData/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const singleUser = await users.findById({
      _id: id,
    });

    console.log(singleUser);
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(404).json(error);
  }
});

// update user data
router.patch("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateUser);
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

// delete user
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await users.findByIdAndDelete({ _id: id });
    console.log(deleteUser);
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
