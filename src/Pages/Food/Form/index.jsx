import CurrencyFormat from "react-currency-format";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Header from "../../../Components/Header";

import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  addFoodMenu,
  getFoodMenuById,
  updateFoodMenu,
} from "../../../Store/actions/foodMenuAction";

function FormMenu(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string().required("Mohon isi terlebih dahulu"),
    price: Yup.number().required("Mohon isi terlebih dahulu"),
  });

  const { detail, status, type, loading } = useSelector(
    (state) => state.foodMenu
  );

  useEffect(() => {
    console.log(detail);
  }, [detail]);

  const params = useParams();

  useEffect(() => {
    // console.log(params);
    if (params.id) {
      dispatch(getFoodMenuById(params.id));
    }
  }, [params]);

  useEffect(() => {
    console.log(type, status);
    if (type == "insert" || type == "update") {
      if (status.success) {
        toast.success(status.message);
        formik.resetForm();
        navigate("/food");
      } else {
        toast.error(status.message);
      }
    }
  }, [status, type]);

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    formik.handleChange(e);
    formik.setFieldValue("image", files[0]);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: detail.name || "",
      price: detail.price || "",
      image: null,
    },
    validationSchema: DisplayingErrorMessagesSchema,
    onSubmit: function (values, actions) {
      // setLoadingSubmit(true);

      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);

      console.log(values);

      if (values.image) {
        formData.append("image", values.image);
      }

      if (detail.id) {
        console.log(formData, detail.id);
        dispatch(updateFoodMenu(detail.id, formData));
      } else {
        dispatch(addFoodMenu(formData));
      }
    },
    validateOnBlur: false,
  });

  const convertFileToImageSrc = (file) => {
    return URL.createObjectURL(file);
  };

  return (
    <>
      <Header />
      <main>
        <div className="min-h-screen w-full py-4 px-8 lg:px-8  bg-gray-200">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
          >
            <p className="text-primer font-bold text-md">
              {detail.id ? "Ubah" : "Tambah"} Menu
            </p>
            <div className=" mt-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Nama Menu
              </label>

              <div className="mt-2">
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  type="text"
                  name="name"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full mt-2">
              <label
                htmlFor="foto-menu"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Foto Menu
              </label>
              <label
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => handleDragOver(e)}
                onDragEnter={(e) => handleDragEnter(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                htmlFor="image"
                id="foto-menu-label"
                className="mt-2 flex justify-center rounded-sm border  border-gray-300 bg-gray-200 px-6 py-10"
              >
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    formik.setFieldValue("image", e.target.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                  className="sr-only"
                />
                <div className="text-center">
                  <AiOutlineCloudUpload
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <p className="text-xs  text-gray-600">
                    drag and drop a file here or click
                  </p>
                </div>
              </label>

              {formik.values.image && (
                <img
                  className="w-64 mt-3"
                  src={convertFileToImageSrc(formik.values.image)}
                />
              )}

              {detail.image_url && detail.id && (
                <img className="w-64 mt-3" src={detail.image_url} />
              )}
            </div>
            <div className=" mt-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Harga Menu
              </label>

              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                  <span className="flex select-none rounded-lt-md items-center px-3 text-white sm:text-sm bg-primer">
                    Rp
                  </span>
                  <CurrencyFormat
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    type="text"
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      formik.setFieldValue("price", value);
                    }}
                    name="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => console.log(formik.errors)}
              disabled={loading}
              className="mt-4 ml-auto items-center flex justify-center rounded-sm  bg-green-400 hover:bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
              Simpan
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default FormMenu;
