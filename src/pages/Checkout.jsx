import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { ArrowLeft, CheckCircle2, MapPin, PackageCheck, Truck } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

const ORDERS_STORAGE_KEY = "orders";
const HANDLING_CHARGE = 5;

const Checkout = ({ location }) => {
  const { cartItem, setCartItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({
    fullName: user?.fullName || "",
    phone: "",
    address: location?.road || location?.county || "",
    city: location?.city || location?.town || location?.village || "",
    division: location?.state || "",
    postcode: location?.postcode || "",
    country: location?.country || "",
  });

  const itemsTotal = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const grandTotal = itemsTotal + HANDLING_CHARGE;

  if (cartItem.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShipping((current) => ({ ...current, [name]: value }));
  };

  const placeOrder = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const customer = Object.fromEntries(
      Object.keys(shipping).map((field) => [
        field,
        String(formData.get(field) || "").trim(),
      ]),
    );
    const order = {
      id: crypto.randomUUID(),
      userId: user.id,
      customer,
      items: cartItem.map((item) => ({ ...item })),
      itemsTotal,
      handlingCharge: HANDLING_CHARGE,
      total: grandTotal,
      paymentMethod: "Cash on delivery",
      status: "Order placed",
      createdAt: new Date().toISOString(),
    };

    try {
      const existingOrders = JSON.parse(
        localStorage.getItem(ORDERS_STORAGE_KEY) || "[]",
      );
      if (!Array.isArray(existingOrders)) {
        throw new Error("Saved orders data is not a list.");
      }
      localStorage.setItem(
        ORDERS_STORAGE_KEY,
        JSON.stringify([order, ...existingOrders]),
      );
    } catch (error) {
      console.error("Unable to save the order.", error);
      toast.error("Unable to save your order. Please try again.");
      return;
    }

    setCartItem([]);
    toast.success("Your order has been placed!");
    navigate("/orders");
  };

  return (
    <main className="mx-auto mb-12 mt-8 max-w-6xl px-4">
      <Link
        to="/cart"
        className="mb-6 inline-flex items-center gap-2 font-medium text-gray-600 hover:text-red-500"
      >
        <ArrowLeft size={18} />
        Back to cart
      </Link>

      <div className="mb-8">
        <p className="font-semibold uppercase tracking-wide text-red-500">
          Almost there
        </p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="mt-2 text-gray-600">
          Confirm your delivery details and pay when your order arrives.
        </p>
      </div>

      <form
        onSubmit={placeOrder}
        className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px]"
      >
        <section className="space-y-6">
          <div className="rounded-lg bg-gray-100 p-6 md:p-8">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-800">
              <MapPin className="text-red-500" size={22} />
              Delivery information
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 sm:col-span-2">
                Full name
                <input
                  name="fullName"
                  autoComplete="name"
                  value={shipping.fullName}
                  onChange={handleChange}
                  required
                  className="rounded-md p-3 font-normal"
                  placeholder="Name for the delivery"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Phone number
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={shipping.phone}
                  onChange={handleChange}
                  required
                  className="rounded-md p-3 font-normal"
                  placeholder="Your contact number"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Street address
                <input
                  name="address"
                  autoComplete="street-address"
                  value={shipping.address}
                  onChange={handleChange}
                  required
                  className="rounded-md p-3 font-normal"
                  placeholder="House, street, or area"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                City / town
                <input
                  name="city"
                  autoComplete="address-level2"
                  value={shipping.city}
                  onChange={handleChange}
                  required
                  className="rounded-md p-3 font-normal"
                  placeholder="City or town"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Division / state
                <input
                  name="division"
                  autoComplete="address-level1"
                  value={shipping.division}
                  onChange={handleChange}
                  required
                  className="rounded-md p-3 font-normal"
                  placeholder="Division or state"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Postcode
                <input
                  name="postcode"
                  autoComplete="postal-code"
                  value={shipping.postcode}
                  onChange={handleChange}
                  className="rounded-md p-3 font-normal"
                  placeholder="Postcode (if available)"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Country
                <input
                  name="country"
                  autoComplete="country-name"
                  value={shipping.country}
                  onChange={handleChange}
                  required
                  className="rounded-md p-3 font-normal"
                  placeholder="Country"
                />
              </label>
            </div>
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-gray-800">
              <Truck className="text-red-500" size={21} />
              Payment method
            </h2>
            <div className="flex items-start gap-3">
              <input
                id="cash-on-delivery"
                type="radio"
                name="paymentMethod"
                checked
                readOnly
                className="mt-1"
              />
              <label htmlFor="cash-on-delivery">
                <span className="font-semibold text-gray-800">
                  Cash on delivery
                </span>
                <span className="mt-1 block text-sm text-gray-600">
                  Pay in cash when your order is delivered. No online payment
                  is required.
                </span>
              </label>
            </div>
          </div>
        </section>

        <aside className="rounded-lg border border-gray-100 bg-white p-6 shadow-lg">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-800">
            <PackageCheck className="text-red-500" size={22} />
            Order summary
          </h2>

          <div className="mb-4 max-h-72 space-y-4 overflow-y-auto">
            {cartItem.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-14 w-14 rounded-md bg-gray-50 object-contain"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="whitespace-nowrap font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t border-gray-200 pt-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Items total</span>
              <span>${itemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Handling charge</span>
              <span>${HANDLING_CHARGE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold text-gray-900">
              <span>Total due on delivery</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            <CheckCircle2 size={19} />
            Place order
          </button>
          <p className="mt-3 text-center text-xs text-gray-500">
            You will pay ${grandTotal.toFixed(2)} when your order arrives.
          </p>
        </aside>
      </form>
    </main>
  );
};

export default Checkout;