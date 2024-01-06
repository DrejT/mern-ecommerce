import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { object, string } from "yup";
import ax from "../../utils/axios";
import { useFormik } from "formik";
import { StoreDeleteForm, StoreEditForm } from "../../components/store.dashboard";

export const storeNameSchema = string()
  .min(3, "minimum 3 characters")
  .max(100, "maximum 100 characters");
export const storeBusinessEmailSchema = string().email("enter a valid email");

export const storeDescriptionSchema = string()
  .min(10, "minimum 10 characters")
  .max(250, "maximum 250 characters");

export function StoreModalForm() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newStoreObj) => {
      return ax.post("/admin/store/", newStoreObj, {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      businessEmail: "",
      description: "",
    },
    validationSchema: object({
      name: storeNameSchema.required(),
      description: storeDescriptionSchema.required(),
      businessEmail: storeBusinessEmailSchema.required(),
    }),
    onSubmit: async function (values) {
      try {
        const res = await mutation.mutateAsync(values);
        // console.log(res);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <button
        className="btn btn-primary m-1"
        style={{ width: "100px" }}
        data-bs-toggle="modal"
        data-bs-target="#storeFormModal"
      >
        new Store
      </button>

      <div
        className="modal fade"
        id="storeFormModal"
        tabIndex="-1"
        aria-labelledby="storeFormModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-lg modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="storeFormModal">
                create new Store
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
                        <small>creating new Store...</small>
                      </>
                    ) : mutation.isError ? (
                      <>
                        <small>{mutation.error.message}</small>
                      </>
                    ) : mutation.isSuccess ? (
                      <>
                        <small>created store successfully</small>
                      </>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary my-2"
                    data-bs-dismiss="modal"
                    disabled={formik.isSubmitting}
                  >
                    Create
                  </button>
                  {/* <div className="modal-footer"> */}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  {/* </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Store() {
  const { status, data, error } = useQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
    staleTime: 30000,
  });
  async function fetchStores() {
    try {
      const stores = await ax.get("/admin/store/", { withCredentials: true });
      return stores;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="col">
        {status === "pending" ? (
          <>
            <p>loading...</p>
          </>
        ) : status === "error" ? (
          <>
            <p>An error occured</p>
          </>
        ) : (
          data?.data?.map((obj) => {
            return (
              <div
                key={obj._id}
                className="p-2 border border-primary rounded-4"
              >
                <p>{obj.name}</p>
                <p>{obj.description}</p>
                <p>{obj.businessEmail}</p>
                <div>
                  <button
                    className="btn btn-primary m-1"
                    data-bs-toggle="modal"
                    data-bs-target={`#${obj.slug}Edit`}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <StoreEditForm storeObj={obj} />
                  <button
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target={`#${obj.slug}Delete`}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <StoreDeleteForm storeObj={obj} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
