const express = require("express");
const {
  deleteUser,
  getAllUsers,
  getBookingsOfUser,
  getUserById,
  login,
  singup,
  updateUser,
} = require("../controller/user-controller");

const userRouter = express.Router();

// userRouter.get("/", getAllUsers);
// userRouter.put("/:id", updateUser);
// userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUserById);
userRouter.post("/signup", singup);
userRouter.post("/login", login);
userRouter.get("/bookings/:id", getBookingsOfUser);

module.exports = userRouter;
