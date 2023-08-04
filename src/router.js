const { Router } = require("express");
const users = require("./controlers/user");
const auxiliaryFunction = require("./auxiliaryFunction/findDadosUser");
const validateToken = require("./middlewear/token");

const router = Router();
router.post("/cadastroUser", users.registerUser);
router.post("/login", users.userLogin);

router.use(validateToken);

router.post("/findOneUser", users.findOneUser);
router.get("/findUsers", users.findUsers);
router.post("/findDadosUser", auxiliaryFunction.findDadosUser);
router.put("/update", users.updateUser);
router.post("/deleteUser", users.deleteUser);
module.exports = router;
