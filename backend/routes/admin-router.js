const express =require("express");
const { addAdmin, adminLogin, getAdmins, getAdminById } =require("../controller/admin-controller");

const adminRouter = express.Router();

// adminRouter.post("/signup", addAdmin);
adminRouter.get("/:id", getAdminById);
adminRouter.post("/login", adminLogin);
adminRouter.get("/", getAdmins);

module.exports = adminRouter;