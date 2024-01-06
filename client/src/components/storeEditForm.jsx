import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { object } from "yup";
import {
  storeBusinessEmailSchema,
  storeDescriptionSchema,
  storeNameSchema,
} from "../pages/dashboard/stores";
import ax from "../utils/axios";

export function StoreEditForm({ storeObj }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => {
      return ax.patch(`/admin/store/${storeObj.slug}`, values, {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
  const formik = useFormik({
    initialValues: {
      name: storeObj.name,
      description: storeObj.description,
      businessEmail: storeObj.businessEmail,
    },
    validationSchema: object({
      name: storeNameSchema,
      description: storeDescriptionSchema,
      businessEmail: storeBusinessEmailSchema,
    }),
    onSubmit: async function (values) {
      try {
        const res = await mutation.mutateAsync(values);
        console.log(res);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div
        className="modal fade"
        id="storeEditFormModal"
        tabIndex="-1"
        aria-labelledby="storeEditFormModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-lg modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="storeEditFormModal">
                Edit Store
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <form action="" onSubmit={formik.handleSubmit}>
                  <div className="col">
                    <label htmlFor="name" className="input-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      className="form-control"
                      placeholder="my store"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <small className="error-message">
                        {formik.errors.name}
                      </small>
                    ) : null}
                  </div>
                  <div className="col">
                    <label htmlFor="businessEmail" className="input-label">
                      Business Email
                    </label>
                    <input
                      type="email"
                      id="businessEmail"
                      name="businessEmail"
                      autoComplete="email"
                      className="form-control"
                      placeholder="example@business.com"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.businessEmail}
                    />
                    {formik.touched.businessEmail &&
                    formik.errors.businessEmail ? (
                      <small className="error-message">
                        {formik.errors.businessEmail}
                      </small>
                    ) : null}
                  </div>
                  <div className="col">
                    <label htmlFor="description" className="input-label">
                      Description
                    </label>
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      className="form-control"
                      placeholder="A great place to hangout"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <small className="error-message">
                        {formik.errors.description}
                      </small>
                    ) : null}
                  </div>
                  <div>
                    {mutation.isPending ? (
                      <>
                        <small>editing Store...</small>
                      </>
                    ) : mutation.isError ? (
                      <>
                        <small>{mutation.error.message}</small>
                      </>
                    ) : mutation.isSuccess ? (
                      <>
                        <small>edited store successfully</small>
                      </>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary my-2"
                    data-bs-dismiss="modal"
                    disabled={formik.isSubmitting}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function StoreDeleteForm({ storeObj }) {
  const queryClient = useQueryClient();
  async function handleDelete() {
    try {
      const res = await ax.delete(`/admin/store/${storeObj.slug}`);
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="modal" id="storeDeleteFormModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Store?</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Do you want to delete {storeObj.name}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
