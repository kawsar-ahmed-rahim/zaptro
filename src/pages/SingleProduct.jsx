
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../assets/Loading4.webm";
import Breadcrums from "../components/Breadcrums";

import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const params = useParams();

  const [singleProduct, setSingleProduct] = useState(null);

  const { addToCart } = useCart();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${params.id}`
      );

      const product = res.data;

      setSingleProduct(product);

      console.log("Single Product:", product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.id]);

  return (
    <>
      {singleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <Breadcrums title={singleProduct.title} />

          <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Product Image */}
            <div className="w-full">
              <img
                src={singleProduct.image}
                alt={singleProduct.title}
                className="rounded-2xl w-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6">

              <h1 className="md:text-3xl text-xl font-bold text-gray-800">
                {singleProduct.title}
              </h1>

              {/* Category */}
              <div className="text-gray-700">
                Category:{" "}
                {singleProduct.category?.toUpperCase()}
              </div>

              {/* Price */}
              <p className="text-xl text-red-500 font-bold">
                ${singleProduct.price}
              </p>

              {/* Rating */}
              <div className="text-gray-700">
                Rating: {singleProduct.rating?.rate} ⭐
              </div>

              <div className="text-gray-700">
                Reviews: {singleProduct.rating?.count}
              </div>

              {/* Description */}
              <p className="text-gray-600">
                {singleProduct.description}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="quantity"
                  className="text-sm font-medium text-gray-700"
                >
                  Quantity:
                </label>

                <input
                  id="quantity"
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Add To Cart */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => addToCart(singleProduct)}
                  className="px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  <IoCartOutline className="w-6 h-6" />
                  Add to Cart
                </button>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
