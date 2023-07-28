const { Router } = require("express");
const users = require("./controlers/user");
const auxiaryFunction = require("./auxiliaryFunction/findDadosUser");
const validateToken = require("./middlewear/token");

const router = Router();

router.post("/usuario", users.registerUser);
router.post("/login", users.userLogin);

router.use(validateToken);

router.post("/finUrl", auxiaryFunction.findDadosUser);
router.put("/update", users.updateUser);

module.exports = router;
