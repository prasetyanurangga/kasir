import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { GoAlert } from "react-icons/go";
import { HiPencil, HiPlus, HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Header";
import {
  getFoodMenu,
  removeFoodMenuById,
} from "../../../Store/actions/foodMenuAction";

function MasterFood() {
  const navigate = useNavigate();
  const {
    data: bunchOfFood,
    loading,
    status,
    type,
  } = useSelector((state) => state.foodMenu);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFoodMenu());
  }, []);

  const convertNumberToCurrencyIndonesia = (number) => {
    const formatNumbering = new Intl.NumberFormat("id-ID");
    return "Rp " + formatNumbering.format(number);
  };

  const [showModalDelete, setShowModalDelete] = useState({
    show: false,
    id: null,
  });

  useEffect(() => {
    if (type == "delete") {
      if (status.success) {
        toast.success(status.message);
        setShowModalDelete({
          show: false,
          id: null,
        });
        dispatch(getFoodMenu());
      } else {
        toast.error(status.message);
      }
    }
  }, [status, type]);

  const cancelButtonRef = useRef(null);

  return (
    <>
      <Transition.Root show={showModalDelete.show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() =>
            setShowModalDelete({
              show: false,
              id: null,
            })
          }
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <GoAlert
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Peringatan
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Apakah anda akan menghapus data?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() =>
                        dispatch(removeFoodMenuById(showModalDelete.id))
                      }
                    >
                      {loading && (
                        <svg
                          aria-hidden="true"
                          role="status"
                          class="inline w-4 h-4 mr-3 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                      OK
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() =>
                        setShowModalDelete({
                          show: false,
                          id: null,
                        })
                      }
                      ref={cancelButtonRef}
                    >
                      Batal
                    </button>
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
          <p className="text-gray-500 mb-2">
            Tambahkan menu makanan yang ada di resto
          </p>
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <button
              onClick={() => navigate("/food/form")}
              className="flex items-center rounded-sm gap-x-2  bg-primer px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow hover:bg-darkPrimer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <HiPlus /> <span>Tambah Menu</span>
            </button>
            <div className="mt-4 flex flex-row w-full">
              <table class="flex-1 table-auto">
                <thead className="bg-[#e6e6e6]">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Nama</th>
                    <th className="p-3">Foto</th>
                    <th className="p-3">Harga</th>
                    <th className="p-3">Aksi</th>
                  </tr>
                </thead>
                {loading ? (
                  <tr>
                    <td colSpan={5}>
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
                    </td>
                  </tr>
                ) : (
                  <tbody>
                    {bunchOfFood.map((item, index) => (
                      <tr
                        key={item.id}
                        className={index % 2 == 1 ? "bg-[#f9f9f9]" : "bg-white"}
                      >
                        <td className="text-center p-3">{index + 1}</td>
                        <td
                          className="p-3"
                          onClick={() => navigate(`/food/form/${item.id}`)}
                        >
                          {item.name}
                        </td>
                        <td className="p-3">
                          <img className="w-16" src={item.image_url} />
                        </td>
                        <td className="p-3">
                          {convertNumberToCurrencyIndonesia(item.price)}
                        </td>

                        <td className="p-3 flex flex-row justify-center gap-x-4">
                          <button
                            onClick={() => navigate(`/food/form/${item.id}`)}
                            className="flex items-center rounded-sm gap-x-2  bg-primer px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow hover:bg-darkPrimer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            <HiPencil />
                          </button>

                          <button
                            onClick={() =>
                              setShowModalDelete({
                                show: true,
                                id: item.id,
                              })
                            }
                            className="flex items-center rounded-sm gap-x-2  bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                          >
                            <HiTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MasterFood;
