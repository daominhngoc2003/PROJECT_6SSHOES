import express from "express";
import {
  addToCart,
  deleleAllProductCart,
  deleteProductCart,
  getCartByUser,
  updateCart,
  applyCoupon,
} from "../controller/cart/index.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorization.js";

const Router = express.Router();
Router.get("/carts/user/:user_id", authenticate, getCartByUser);
Router.post("/carts", authenticate, addToCart);
Router.put("/carts/update", authenticate, updateCart);

Router.delete("/carts/deleteall/:userId", authenticate, deleleAllProductCart);
Router.post("/carts/delete", authenticate, deleteProductCart);

Router.patch("/carts/:id/apply", authenticate, applyCoupon);

export default Router;
