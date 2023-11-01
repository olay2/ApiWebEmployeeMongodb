const express = require("express");
const router = express.Router();

const {
  read,
  list,
  create,
  update,
  remove,
} = require("../Controllers/productController");
// middleware
const { auth } = require("../Middleware/auth");

//http://localhost:5000/api/product
router.get("/Allproduct", auth, list);
router.get("/Oneproduct/:id", auth, read);
router.post("/Addproduct", auth, create);
router.put("/Updateproduct/:id", auth, update);
router.delete("/Deleteproduct/:id", auth, remove);

module.exports = router;
