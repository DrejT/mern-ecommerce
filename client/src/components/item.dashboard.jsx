import { useMutation, useQueryClient } from "@tanstack/react-query";
import ax from "../utils/axios";
import { useFormik } from "formik";
import {
  itemDescriptionSchema,
  itemNameSchema,
  itemOnShelfSchema,
  itemPriceSchema,
  itemQuantitySchema,
  itemSaleSchema,
} from "../pages/dashboard/items";
import { object } from "yup";

export function DashboardItem({ itemObj }) {
  return (
    <>
      <div
        className="modal fade"
        id={itemObj.slug}
        tabIndex="-1"
        aria-labelledby="itemViewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-lg modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="itemViewModalLabel">
                {itemObj.name}
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
                <div className="row">
                  <div className="col col-6">
                    <img src={itemObj.immageUrl} alt={itemObj.slug} />
                  </div>
                  <div className="col col-6">
                    <p>{itemObj.description}</p>
                    price<p>{itemObj.price}</p>
                    quantity<p>{itemObj.quantity}</p>
                    onShelf<p>{itemObj.onShelf ? "yes" : "no"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function DashboardItemEdit({ itemObj }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => {
      return ax.patch(`/admin/item/${itemObj.slug}`, values, {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
  const formik = useFormik({
    initialValues: {
      name: itemObj.name,
      description: itemObj.description,
      price: itemObj.price,
      quantity: itemObj.quantity,
      sale: itemObj.sale,
      onShelf: itemObj.onShelf,
    },
    validationSchema: object({
      name: itemNameSchema,
      description: itemDescriptionSchema,
      price: itemPriceSchema,
      quantity: itemQuantitySchema,
      sale: itemSaleSchema,
      onShelf: itemOnShelfSchema,
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
        id={`${itemObj.slug}Edit`}
        tabIndex="-1"
        aria-labelledby="itemViewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-lg modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="itemViewModalLabel">
                {itemObj.name}
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
                <div className="row">
                  <div className="col col-6">images herre</div>
                  <div className="col col-6">
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
                        {formik.touched.description &&
                        formik.errors.description ? (
                          <small className="error-message">
                            {formik.errors.description}
                          </small>
                        ) : null}
                      </div>
                      <div className="col">
                        <label htmlFor="price" className="input-label">
                          price
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.price}
                        />
                        {formik.touched.price && formik.errors.price ? (
                          <small className="error-message">
                            {formik.errors.price}
                          </small>
                        ) : null}
                      </div>
                      <div className="col">
                        <label htmlFor="quantity" className="input-label">
                          quantity
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.quantity}
                        />
                        {formik.touched.quantity && formik.errors.quantity ? (
                          <small className="error-message">
                            {formik.errors.quantity}
                          </small>
                        ) : null}
                      </div>
                      <div className="col">
                        <label htmlFor="sale" className="input-label">
                          sale
                        </label>
                        <input
                          type="number"
                          id="sale"
                          name="sale"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.sale}
                        />
                        {formik.touched.sale && formik.errors.sale ? (
                          <small className="error-message">
                            {formik.errors.sale}
                          </small>
                        ) : null}
                      </div>

                      <div className="col">
                        <label htmlFor="onShelf" className="input-label">
                          onShelf
                        </label>
                        <input
                          type="checkbox"
                          id="onShelf"
                          name="onShelf"
                          className="form-control form-check-input"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.onShelf}
                        />
                        {formik.touched.onShelf && formik.errors.onShelf ? (
                          <small className="error-message">
                            {formik.errors.onShelf}
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
                        className="btn btn-primary m-2"
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
        </div>
      </div>
    </>
  );
}

export function DashboardItemDelete({ itemObj }) {
  const queryClient = useQueryClient();
  async function handleDelete() {
    try {
      const res = await ax.delete(`/admin/item/${itemObj.slug}`);
      queryClient.invalidateQueries({ queryKey: ["items"] });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="modal" id={`${itemObj.slug}Delete`} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Item?</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Do you want to delete {itemObj.name}</p>
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
