const express = require("express");
const {
  getProducts,
  newProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  // createReview,
  // getReviews,
  // deleteReview,
  // getAdminProducts
} = require("../controllers/productController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

const router = express.Router();

router.route("/products").get(isAuthenticatedUser, getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/product/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct);

// router.route("/review").put(isAuthenticatedUser, createReview);


//admin
router.route("admin/products/new").post(isAuthenticatedUser, authorizeRoles("admin"), newProducts);

module.exports = router;
