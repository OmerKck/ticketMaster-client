import React from "react";
import axios from "axios";
import { apiURL } from "../../constants/";
import Layout from "../../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { saveToken } from "src/utils";

const RegisterScreen = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email geçersiz formatta")
        .required("Email alanı gereklidir"),
      username: Yup.string().required("Kullanıcı Adı Gerekli bir Alandır"),
      password: Yup.string()
        .required("Şifre alanı gereklidir")
        .min(6, "Şifre en az 6 karakter olmalıdır"),
    }),
    onSubmit: async (values) => {
      const { email, password, username } = values;
      axios
        .post(`${apiURL}/auth/local/register`, {
          email,
          password,
          username,
        })
        .then((res) => {
          const token = res.data.jwt;
          if (token) {
            saveToken(token);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div>
      <Layout>
        <h1 className="text-center text-white text-2xl font-light">
          TicketMaster Register
        </h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2 "
                >
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  id="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  className="shadow apperance-none border rounded 
                  w-full py-2 px-3 text-gray-700 leading-tight
                  focus:outline-none focus:shadow-otline"
                  placeholder="Kullanıcı Adınız..."
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2 "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="shadow apperance-none border rounded 
                  w-full py-2 px-3 text-gray-700 leading-tight
                  focus:outline-none focus:shadow-otline"
                  placeholder="Email Adresiniz..."
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error:{formik.errors.email}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2 "
                >
                  Şifre
                </label>
                <input
                  type="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="shadow apperance-none border rounded 
                  w-full py-2 px-3 text-gray-700 leading-tight
                  focus:outline-none focus:shadow-otline"
                  placeholder="Şifreniz"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error:{formik.errors.password}</p>
                </div>
              ) : null}
              <input
                type="submit"
                value="Üye Ol"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 "
              />
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default RegisterScreen;
