import "./login.style.css";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { useAuth } from "../utils/authcontext";
import { useQueryClient } from "@tanstack/react-query";

const ax = axios.create({
  baseURL: API_URL,
});

export default function Login() {
  return (
    <>
      <LoginForm />
    </>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { authUser, setAuthUser, IsLoggedIn, setIsLoggedIn } = useAuth();
  const [formStatus, setFormStatus] = useState({
    res: "",
    err: "",
    stat: "",
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: object({
      username: string().required("this field is required"),
      password: string().required("this field is required"),
    }),
    onSubmit: async function (values) {
      try {
        const responseData = await ax.post("/auth/login", values, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });

        // const user = await ax.get("/auth/" + responseData.data.user.id, {
        //   withCredentials: true,
        // });
        if (responseData?.status === 200) {
          queryClient.setQueryData("user", responseData.data.user);
          setFormStatus({ res: "loggedin successfully!", stat: true });
          setAuthUser(responseData.data.user);
          setIsLoggedIn(true);
          if (responseData?.data?.user?.role === "user") {
            navigate("/");
          } else {
            navigate(`/dashboard`);
          }
        }
      } catch (error) {
        console.log(error);
        switch (error?.response?.status) {
          case 409:
            setFormStatus({
              err: error.response.data.error.message,
              stat: false,
            });
            break;
          // case 422:
          //   setFormStatus({
          //     err: error.response.data.error.message,
          //     stat: false,
          //   });
          //   break;
          case 401:
            setFormStatus({
              err: error.response.data.error.message,
              stat: false,
            });
            break;
          case 500:
            setFormStatus({
              err: error.response.data.error.message,
              stat: false,
            });
            break;
          default:
            setFormStatus({
              err: "No server response",
              stat: false,
            });
            break;
        }
      }
    },
  });
  return (
    <>
      <div className="container" style={{ marginTop: "7rem" }}>
        <div className="row text-center justify-content-center ">
          <div
            className="col-lg-4 col-sm-6 p-4 border border-dark rounded-4"
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <h3 className="m-0">Login</h3>
            <div className="row">
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="col mt-4">
                  <label htmlFor="username" className="input-label">
                    Username
                  </label>

                  <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    className="form-control"
                    placeholder="coolname213"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <small className="error-message">
                      {formik.errors.username}
                    </small>
                  ) : null}
                </div>

                <div className="col mt-4">
                  <label htmlFor="password" className="input-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    className="form-control"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <small className="error-message">
                      {formik.errors.password}
                    </small>
                  ) : null}
                </div>

                <div>
                  <Link to="/register">Don't have an account?</Link>
                  <br />
                  {formStatus.stat ? formStatus.res : formStatus.err}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary my-2"
                  disabled={formik.isSubmitting}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
