
import React from "react";

import { useCart } from "../context/CartContext";

import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";

import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import emptyCart from "../assets/empty-cart.png";

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();

  const { user } = useUser();

  const navigate = useNavigate();

  // Calculate total price according to quantity
  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {cartItem.length > 0 ? (
        <div>
          {/* Cart Heading */}
          <h1 className="font-bold text-2xl">
            My Cart ({cartItem.length})
          </h1>

          <div>
            {/* Cart Items */}
            <div className="mt-10">
              {cartItem.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full"
                  >
                    {/* Product Information */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 rounded-md object-contain"
                      />

                      <div>
                        <h1 className="md:w-[300px] line-clamp-2">
                          {item.title}
                        </h1>

                        <p className="text-red-500 font-semibold text-lg">
                          ${item.price}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                      <button
                        onClick={() =>
                          updateQuantity(cartItem, item.id, "decrease")
                        }
                        className="cursor-pointer"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(cartItem, item.id, "increase")
                        }
                        className="cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete */}
                    <span
                      onClick={() => deleteItem(item.id)}
                      className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl cursor-pointer"
                    >
                      <FaRegTrashAlt className="text-red-500 text-2xl" />
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">

              {/* Delivery Information */}
              <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
                <h1 className="text-gray-800 font-bold text-xl">
                  Delivery Info
                </h1>

                {/* Full Name */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="fullName">Full Name</label>

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your name"
                    className="p-2 rounded-md"
                    value={user?.fullName || ""}
                    readOnly
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="address">Address</label>

                  <input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    className="p-2 rounded-md"
                    value={location?.county || ""}
                    readOnly
                  />
                </div>

                {/* State + Postcode */}
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="state">State</label>

                    <input
                      id="state"
                      type="text"
                      placeholder="Enter your state"
                      className="p-2 rounded-md w-full"
                      value={location?.state || ""}
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="postcode">PostCode</label>

                    <input
                      id="postcode"
                      type="text"
                      placeholder="Enter your postcode"
                      className="p-2 rounded-md w-full"
                      value={location?.postcode || ""}
                      readOnly
                    />
                  </div>
                </div>

                {/* Country + Phone */}
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="country">Country</label>

                    <input
                      id="country"
                      type="text"
                      placeholder="Enter your country"
                      className="p-2 rounded-md w-full"
                      value={location?.country || ""}
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="phone">Phone No</label>

                    <input
                      id="phone"
                      type="text"
                      placeholder="Enter your Number"
                      className="p-2 rounded-md w-full"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer">
                  Submit
                </button>

                <div className="flex items-center justify-center w-full text-gray-700">
                  ---------OR-----------
                </div>

                {/* Detect Location */}
                <div className="flex justify-center">
                  <button
                    onClick={getLocation}
                    className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
                  >
                    Detect Location
                  </button>
                </div>
              </div>

              {/* Bill Details */}
              <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
                <h1 className="text-gray-800 font-bold text-xl">
                  Bill details
                </h1>

                {/* Items Total */}
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <LuNotebookText />
                    </span>
                    Items total
                  </h1>

                  <p>${totalPrice.toFixed(2)}</p>
                </div>

                {/* Delivery Charge */}
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <MdDeliveryDining />
                    </span>
                    Delivery Charge
                  </h1>

                  <p className="text-red-500 font-semibold">
                    <span className="text-gray-600 line-through">
                      $25
                    </span>{" "}
                    FREE
                  </p>
                </div>

                {/* Handling Charge */}
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <GiShoppingBag />
                    </span>
                    Handling Charge
                  </h1>

                  <p className="text-red-500 font-semibold">
                    $5
                  </p>
                </div>

                <hr className="text-gray-200 mt-2" />

                {/* Grand Total */}
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold text-lg">
                    Grand total
                  </h1>

                  <p className="font-semibold text-lg">
                    ${(totalPrice + 5).toFixed(2)}
                  </p>
                </div>

                {/* Promo Code */}
                <div>
                  <h1 className="font-semibold text-gray-700 mb-3 mt-7">
                    Apply Promo Code
                  </h1>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="p-2 rounded-md w-full border border-gray-200"
                    />

                    <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3 hover:bg-red-600 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Cart */
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className="text-red-500/80 font-bold text-5xl text-muted">
            Oh no! Your cart is empty
          </h1>

          <img
            src={emptyCart}
            alt="Empty cart"
            className="w-[400px]"
          />

          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-red-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
