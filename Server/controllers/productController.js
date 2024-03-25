const Product = require("../models/productModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");

//handler funtion for GET product request
const getProducts = async (req, res, next) => {
  const resPerPage = 2;
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate(resPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    count: products.length,
    products,
    success: true,
    messege: "This route will show all products in database",
  });
};

const newProducts = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
    message: "This route will add new product to database",
  });
});

//handler funtion for GET single product request
const getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  res.status(200).json({
    success: true,
    product,
    messege: "This route will show single product in database",
  });
});

//handler funtion for PUT(update) request
const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      messege: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
    messege: "This route will update single product in database",
  });
};

//handler funtion for DELETE request
const deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      messege: "Product not found",
    });
  }
  await Product.deleteOne(product);
  res.status(200).json({
    success: true,
    messege: "This route will delete single product in database",
  });
};

// //Create Review - api/v1/review
// const createReview = catchAsyncError(async (req, res, next) =>{
//   const  { productId, rating, comment } = req.body;

//   const review = {
//       user : req.user.id,
//       rating,
//       comment
//   }

//   const product = await Product.findById(productId);
//  //finding user review exists
//  const isReviewed = product.reviews.find(review => {
//   return review.user.toString() == req.user.id.toString()
// });

//   if(isReviewed){
//       //updating the  review
//       product.reviews.forEach(review => {
//     if(review.user && review.user.toString() == req.user.id.toString()){
//         review.comment = comment
//         review.rating = rating
//     }
// })

//   }else{
//       //creating the review
//       product.reviews.push(review);
//       product.numOfReviews = product.reviews.length;
//   }
//   //find the average of the product reviews
//   product.ratings = product.reviews.reduce((acc, review) => {
//       return review.rating + acc;
//   }, 0) / product.reviews.length;
//   product.ratings = isNaN(product.ratings)?0:product.ratings;

//   await product.save({validateBeforeSave: false});

//   res.status(200).json({
//       success: true
//   })

// })

// //Get Reviews - api/v1/reviews?id={productId}
// const getReviews = catchAsyncError(async (req, res, next) =>{
//   const product = await Product.findById(req.query.id).populate('reviews.user','name email');

//   res.status(200).json({
//       success: true,
//       reviews: product.reviews
//   })
// })

// //Delete Review - api/v1/review
// const deleteReview = catchAsyncError(async (req, res, next) =>{
//   const product = await Product.findById(req.query.productId);

//   //filtering the reviews which does match the deleting review id
//   const reviews = product.reviews.filter(review => {
//      return review._id.toString() !== req.query.id.toString()
//   });
//   //number of reviews
//   const numOfReviews = reviews.length;

//   //finding the average with the filtered reviews
//   let ratings = reviews.reduce((acc, review) => {
//       return review.rating + acc;
//   }, 0) / reviews.length;
//   ratings = isNaN(ratings)?0:ratings;

//   //save the product document
//   await Product.findByIdAndUpdate(req.query.productId, {
//       reviews,
//       numOfReviews,
//       ratings
//   })
//   res.status(200).json({
//       success: true
//   })

// });

// get admin products  - api/v1/admin/products
const getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).send({
    success: true,
    products,
  });
});

module.exports = {
  getProducts,
  newProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  // createReview,
  // getReviews,
  // deleteReview,
  getAdminProducts,
};
