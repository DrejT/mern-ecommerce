import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ax from "./../utils/axios";
import { useState } from "react";
import { useFormik } from "formik";
import { number, object, string } from "yup";

export default function Item() {
  const params = useParams();
  const { status, data, error } = useQuery({
    queryKey: ["item"],
    queryFn: fetchItem,
  });
  async function fetchItem() {
    try {
      const res = await ax.get("/user/item/" + params.itemslug);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {status === "pending" ? (
        <>loading</>
      ) : status === "error" ? (
        <>there was an error</>
      ) : (
        <div className="row">
          <div className="col col-md-6 col-12">
            <ItemDisplay item={data} />
          </div>
          <div className="col col-md-6 col-12">
            <ItemOrder item={data} />
          </div>
          <div className="col col-12 p-2">
            <ItemReview item={data} />
          </div>
        </div>
      )}
    </>
  );
}

function ItemDisplay({ item }) {
  return (
    <>
      <div className="mt-2">
        <h3>{item.name}</h3>
        <img src={item.imageUrl} alt={item.slug} className="img-fluid" />
        <p>{item.description}</p>
      </div>
    </>
  );
}

function ItemOrder({ item }) {
  const OrderSchema = object().shape({
    state: string().min(3, "min 3 letters").required("state is required"),
    city: string().required("city is required"),
    pincode: string()
      .required()
      .matches(/^[0-9]+$/, "must be only digits")
      .min(6, "enter a valid pincode")
      .max(6, "enter a valid pincode"),
    address1: string().max("200").required("address1 is required"),
    address2: string().max("200"),
  });
  const formik = useFormik({
    initialValues: {
      state: "",
      city: "",
      pincode: "",
      address1: "",
      address2: "",
    },
    validationSchema: OrderSchema,
    onSubmit: async function (values) {
      try {
        values.for = item._id;
        const res = await ax.post("/user/order", orderObj, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div>
        <h5 className="mt-3">Place Order</h5>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="col mt-4">
            <label htmlFor="state" className="input-label">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              autoComplete="username"
              className="form-control"
              placeholder="Goa"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
            />
            {formik.touched.state && formik.errors.state ? (
              <small className="error-message">{formik.errors.state}</small>
            ) : null}
          </div>

          <div className="col mt-4">
            <label htmlFor="city" className="input-label">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              autoComplete="username"
              className="form-control"
              placeholder="Goa"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city ? (
              <small className="error-message">{formik.errors.city}</small>
            ) : null}
          </div>

          <div className="col mt-4">
            <label htmlFor="pincode" className="input-label">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              autoComplete="postal-code"
              className="form-control"
              placeholder="231233"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pincode}
            />
            {formik.touched.pincode && formik.errors.pincode ? (
              <small className="error-message">{formik.errors.pincode}</small>
            ) : null}
          </div>

          <div className="col mt-4">
            <label htmlFor="address1" className="input-label">
              Address1
            </label>
            <textarea
              type="text"
              id="address1"
              name="address1"
              className="form-control"
              placeholder="A great place to hangout"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address1}
            />
            {formik.touched.address1 && formik.errors.address1 ? (
              <small className="error-message">{formik.errors.address1}</small>
            ) : null}
          </div>

          <div className="col mt-4">
            <label htmlFor="address2" className="input-label">
              Address2
            </label>
            <textarea
              type="text"
              id="address2"
              name="address2"
              className="form-control"
              placeholder="A great place to hangout"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address2}
            />
            {formik.touched.address2 && formik.errors.address2 ? (
              <small className="error-message">{formik.errors.address2}</small>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn btn-primary my-2"
            disabled={formik.isSubmitting}
          >
            Order Now
          </button>
        </form>
      </div>
    </>
  );
}

function ItemReview({ item }) {
  const { data, status, error } = useQuery({
    queryKey: ["itemReview"],
    queryFn: fetchReviews,
    staleTime: 30000,
  });
  async function fetchReviews() {
    try {
      const res = await ax.get(`/user/review/${item._id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  const [formVisible, setFormVisible] = useState(false);
  return (
    <>
      {status === "pending" ? (
        <>loading</>
      ) : status === "error" ? (
        <>there was an error</>
      ) : (
        <>
          <SubmitReviewForm item={item} />
          <DisplayItemReviews itemReviews={data} />
        </>
      )}
    </>
  );
}

function SubmitReviewForm({ item }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => {
      return ax.post("/admin/review", values, {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itemReview"] });
    },
  });
  const reviewFormSchema = object().shape({
    comment: string().max("200").required("comment is required"),
    rating: number().min(1, "min 1 rating").max(5, "max 5 rating").required(),
  });
  const formik = useFormik({
    initialValues: {
      comment: "",
      rating: 0,
    },
    validationSchema: reviewFormSchema,
    onSubmit: async function (values) {
      try {
        values.item = item._id;
        const res = mutation.mutateAsync(values);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <form action="" onSubmit={formik.handleSubmit}>
        <h5 className="m-2">Reviews</h5>
        <div className="col mt-4">
          <label htmlFor="comment" className="input-label">
            comment
          </label>
          <textarea
            type="text"
            id="comment"
            name="comment"
            className="form-control"
            placeholder="A great place to hangout"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.comment}
          />
          {formik.touched.comment && formik.errors.comment ? (
            <small className="error-message">{formik.errors.comment}</small>
          ) : null}
        </div>

        <div className="col mt-4">
          <label htmlFor="rating" className="input-label">
            rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            autoComplete="postal-code"
            className="form-control"
            placeholder="231233"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rating}
          />
          {formik.touched.rating && formik.errors.rating ? (
            <small className="error-message">{formik.errors.rating}</small>
          ) : null}
        </div>
        <button
          type="submit"
          className="btn btn-primary my-2"
          disabled={formik.isSubmitting}
        >
          submit
        </button>
      </form>
    </>
  );
}

function DisplayItemReviews({ itemReviews }) {
  return (
    <>
      <div className="container">
        <div className="row">
          {itemReviews.map((reviewObj) => {
            return (
              <div className="col col-12" key={reviewObj._id}>
                <p>{reviewObj.comment}</p>
                {reviewObj.rating}
                <p>{reviewObj.username}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
