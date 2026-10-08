import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { ArrowRight, PackageCheck, ShoppingBag, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Order = () => {
  const { user } = useUser();
  const [orders] = useState(() =>
    JSON.parse(localStorage.getItem("orders") || "[]"),
  );
  const userOrders = orders
    .filter((order) => order.userId === user?.id)
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));

  return (
    <main className="mx-auto mb-12 mt-8 min-h-[55vh] max-w-6xl px-4">
      <div className="mb-8">
        <p className="font-semibold uppercase tracking-wide text-red-500">
          Your account
        </p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">My orders</h1>
        <p className="mt-2 text-gray-600">
          Review your purchases and delivery details.
        </p>
      </div>

      {userOrders.length === 0 ? (
        <section className="flex min-h-80 flex-col items-center justify-center rounded-lg bg-gray-50 px-6 text-center">
          <ShoppingBag className="mb-4 text-red-400" size={48} />
          <h2 className="text-xl font-bold text-gray-800">No orders yet</h2>
          <p className="mt-2 max-w-md text-gray-600">
            Once you place an order, its items and delivery status will appear
            here.
          </p>
          <Link
            to="/products"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
          >
            Browse products
            <ArrowRight size={18} />
          </Link>
        </section>
      ) : (
        <div className="space-y-5">
          {userOrders.map((order) => (
            <article
              key={order.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              <div className="flex flex-col gap-4 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    ORDER PLACED
                  </p>
                  <p className="mt-1 font-medium text-gray-800">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    ORDER NUMBER
                  </p>
                  <p className="mt-1 break-all font-medium text-gray-800">
                    {order.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    TOTAL
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 p-5 lg:grid-cols-[1fr_280px]">
                <div>
                  <div className="mb-4 flex items-center gap-2 text-green-700">
                    <PackageCheck size={21} />
                    <h2 className="font-bold">{order.status}</h2>
                  </div>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-16 w-16 rounded-md bg-gray-50 object-contain"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="rounded-md bg-gray-50 p-4">
                  <h3 className="mb-3 flex items-center gap-2 font-bold text-gray-800">
                    <Truck className="text-red-500" size={19} />
                    Delivery details
                  </h3>
                  <p className="font-medium text-gray-800">
                    {order.customer.fullName}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {order.customer.address}, {order.customer.city},{" "}
                    {order.customer.division} {order.customer.postcode}
                    {order.customer.country
                      ? `, ${order.customer.country}`
                      : ""}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Phone: {order.customer.phone}
                  </p>
                  <p className="mt-4 border-t border-gray-200 pt-3 text-sm font-medium text-red-600">
                    {order.paymentMethod}
                  </p>
                </aside>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Order;