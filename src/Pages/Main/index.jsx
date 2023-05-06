import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CardFood from "../../Components/CardFood";
import Header from "../../Components/Header";
import ItemCart from "../../Components/ItemCart";
import { getFoodMenu } from "../../Store/actions/foodMenuAction";

function App() {
  const [showModalCharge, setShowModalCharge] = useState(false);

  const [custPay, setCustPay] = useState(0);

  const cancelButtonRef = useRef(null);
  const { data: bunchOfFood, loading } = useSelector((state) => state.foodMenu);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFoodMenu());
  }, []);

  const [bunchOfCart, setBunchOfCart] = useState([]);

  const closeCart = () => {
    setBunchOfCart([]);
  };

  const sumPriceCart = () => {
    return bunchOfCart.reduce((sum, item) => sum + item.price, 0);
  };

  const handleAfterPay = () => {
    if (custPay < sumPriceCart()) {
      toast.error("Uang tidak cukup");
    } else {
      toast.success("Pembayaran berhasil");
      setBunchOfCart([]);
      setCustPay(0);
      setShowModalCharge(false);
    }
  };

  const addCart = (food) => {
    const containFood = bunchOfCart.find((item) => item.id === food.id);
    if (containFood) {
      const updateCart = bunchOfCart.map((item) => {
        if (item.id === food.id) {
          return {
            ...item,
            price: food.price * (item.qty + 1),
            qty: item.qty + 1,
          };
        }
        return item;
      });
      setBunchOfCart(updateCart);
    } else {
      setBunchOfCart([...bunchOfCart, { ...food, qty: 1, price: food.price }]);
    }
  };

  const convertNumberToCurrencyIndonesia = (number) => {
    const formatNumbering = new Intl.NumberFormat("id-ID");
    return "Rp " + formatNumbering.format(number);
  };

  return (
    <>
      <Transition.Root show={showModalCharge} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setShowModalCharge}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-sm bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <p className="font-medium text-md">Detail Pesanan</p>
                    <div className="mt-4 flex flex-row">
                      <table class="flex-1 table-auto">
                        <thead className="bg-[#e6e6e6]">
                          <tr>
                            <th className="p-3">#</th>
                            <th className="p-3 text-center">Nama</th>
                            <th className="p-3">Foto</th>
                            <th className="p-3">Harga</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bunchOfCart.map((item, index) => (
                            <tr
                              className={
                                index % 2 == 1 ? "bg-[#f9f9f9]" : "bg-white"
                              }
                            >
                              <td className="text-center p-3">{index + 1}</td>
                              <td className="p-3">{item.name}</td>
                              <td className="p-3">
                                <img className="w-16" src={item.image_url} />
                              </td>
                              <td className="p-3">
                                {convertNumberToCurrencyIndonesia(item.price)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="w-[2px] bg-gray-200 mx-4"></div>
                      <div className="w-1/3">
                        <p className="font-medium text-sm text-center">
                          Uang Pembeli (Rp)
                        </p>
                        <CurrencyFormat
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          prefix={"Rp. "}
                          type="text"
                          onValueChange={(values) => {
                            const { formattedValue, value } = values;
                            setCustPay(value);
                          }}
                          autoComplete="given-name"
                          className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div className="flex flex-row gap-x-2 mt-2">
                          <button
                            onClick={() => setShowModalCharge(false)}
                            className=" flex w-full justify-center rounded-sm border-2  border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-400 hover:text-white hover:bg-gray-300 shadow"
                          >
                            Close
                          </button>
                          <button
                            onClick={() => handleAfterPay()}
                            className="flex w-full justify-center rounded-sm  bg-primer px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow hover:bg-darkPrimer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Pay
                          </button>
                        </div>
                        <div className="flex-row mt-2 ">
                          <p className="font-medium text-sm  text-red-500">
                            Kembalian :{" "}
                            {convertNumberToCurrencyIndonesia(
                              custPay - sumPriceCart() > 0
                                ? custPay - sumPriceCart()
                                : 0
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Header />
      <main>
        <div className="min-h-screen w-full py-4 px-8 lg:px-8  bg-gray-200">
          <div className=" gap-x-8 bg-gray-200 flex flex-row items-start">
            {loading ? (
              <div className="w-full h-64 flex justify-center items-center">
                <div
                  class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-500 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex-1 grid grid-cols-3 gap-y-4 gap-x-6">
                {bunchOfFood.map((food, indexFood) => (
                  <CardFood
                    key={indexFood}
                    onClick={() => addCart(food)}
                    imageSrc={food.image_url}
                    heading={food.name}
                    subheading={convertNumberToCurrencyIndonesia(food.price)}
                  />
                ))}
              </div>
            )}
            <div className="w-1/3 p-4 rounded-sm overflow-hidden shadow-lg bg-white">
              <p className="mb-4 text-center font-bold text-md">Pesanan</p>
              {bunchOfCart.length > 0 && (
                <>
                  <div className="flex flex-col gap-y-4">
                    {bunchOfCart.map((cart, indexCart) => (
                      <ItemCart
                        key={indexCart}
                        imageSrc={cart.image_url}
                        name={cart.name}
                        qty={cart.qty}
                        price={convertNumberToCurrencyIndonesia(cart.price)}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => closeCart()}
                    className="my-3 flex w-full justify-center rounded-sm border-2  border-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-red-500 hover:text-white hover:bg-red-500 shadow"
                  >
                    Clear Cart
                  </button>

                  <div className="flex flex-row gap-x-4">
                    <button
                      onClick={() =>
                        toast.success("Pembayaran berhasil Disimpan")
                      }
                      className="flex w-full justify-center rounded-sm  bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save bill
                    </button>
                    <button
                      onClick={() => {
                        toast.loading("Sedang Mencetak Struk", {
                          duration: 1000,
                        });
                      }}
                      className="flex w-full justify-center rounded-sm  bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Print bill
                    </button>
                  </div>

                  <button
                    onClick={() => setShowModalCharge(true)}
                    className="mt-3 flex w-full justify-center rounded-sm  bg-primer px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow hover:bg-darkPrimer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Charge {convertNumberToCurrencyIndonesia(sumPriceCart())}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
