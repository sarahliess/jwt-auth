const router = require("express").Router();
const verify = require("../middlewares/protectRoute");

router.get("/", verify, (req, res) => {
  res.send("This is the protected route");
});

module.exports = router;
