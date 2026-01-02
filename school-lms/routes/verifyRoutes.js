const router = require("express").Router();
const auth = require("../middleware/auth");
const c = require("../controllers/verifyController");

router.get("/verify", auth, c.verify);

module.exports = router;
