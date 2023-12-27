import express from "express";
import {
  getAllCoupons,
  removeCoupons,
  createCoupons,
  updateCoupon,
  getOneCouponById,
} from "../controller/coupon/index.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorization.js";
import {
  getCouponAllUsers,
  getCouponByUser,
} from "../controller/coupon/get.js";
import { applyCouponToCart } from "../controller/coupon/apply.js";
import { patchCoupon } from "../controller/coupon/update.js";

const Router = express.Router();

Router.get("/coupons", getAllCoupons);

Router.delete("/coupons/:id", authenticate, removeCoupons);

Router.get("/coupons/:id", getOneCouponById);
Router.get("/coupons/users/:userId", authenticate, getCouponByUser);
Router.get("/get-coupon-all-users", getCouponAllUsers);
Router.post(
  "/coupons",
  authenticate,
  authorize(["Admin", "Member", "Customer"]),
  createCoupons
);
Router.post("/coupons/apply", authenticate, applyCouponToCart);

Router.put("/coupons/:id", authenticate, updateCoupon);

Router.patch("/coupon/patch/:id", authenticate, patchCoupon);
export default Router;
