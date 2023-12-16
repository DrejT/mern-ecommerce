import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import "./register.style.css";
import { useState } from "react";
import { API_URL } from "./../constants";

const ax = axios.create({
  baseURL: API_URL,
});

export default function Register() {
  return (
    <>
      <RegisterForm />
    </>
  );
}

function RegisterForm() {
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState({
    res: "",
    err: "",
    stat: "",
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: object({
      username: string()
        .max(15, "maximum 15 character length")
        .required("this field is required"),
      email: string()
        .email("enter a valid email")
        .required("this field is required"),
      password: string()
        .min(8, "minimum 8 character length")
        .required("this field is required"),
    }),
    onSubmit: async function (values) {
      console.log(values);
      try {
        const responseData = await ax.post("/auth/register", values, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        console.log(responseData.status);
        // console.log(responseData.data.accessToken);
        if (responseData?.status === 200) {
          setFormStatus({ res: "registered successfully!", stat: true });
          navigate("/login");
        }
      } catch (error) {
        console.log(formik);
        switch (error?.response?.status) {
          case 409:
            setFormStatus({
              err: error.response.data.error.message,
              stat: false,
            });
            break;
          case 422:
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
        console.log(error.response.status);
        console.log(error.response.data.error.message);
      }
    },
  });
  console.log(formik.touched);

  return (
    <>
      <div className="container" style={{ marginTop: "7rem" }}>
        <div className="row text-center justify-content-center ">
          <div
            className="col-lg-4 col-sm-8 p-4 border border-dark rounded-4"
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <h3 className="m-0">Register</h3>
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
                  <label htmlFor="email" className="input-label">
                    E-mail
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="form-control"
                    placeholder="example@mail.com"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <small className="error-message">
                      {formik.errors.email}
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
                  <Link to="/login">Already registered?</Link>
                  <br />
                  {formStatus.stat ? formStatus.res : formStatus.err}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary my-2"
                  disabled={formik.isSubmitting}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
