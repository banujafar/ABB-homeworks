import React from "react";
import styles from "./Form.module.scss";
import { useFormik } from "formik";
import { basicSchema } from "../../schemas";
import { handleClearCartProducts } from "../../store/actions/cartProducts";
import { useDispatch } from "react-redux";

const FormCart = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    await new Promise((resolve, reject) => setTimeout(resolve), 1000);
    actions.resetForm();
    dispatch(handleClearCartProducts());
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      address: "",
      phone: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        value={values.firstName}
        onChange={handleChange}
        type="text"
        name="firstName"
        id="firstName"
        placeholder="Enter your first name"
        onBlur={handleBlur}
        className={
          errors.firstName && touched.firstName ? styles["input-error"] : ""
        }
      />
      {errors.firstName && touched.firstName && (
        <p className={styles["errors"]}>{errors.firstName}</p>
      )}
      <label htmlFor="lastName">Last Name</label>
      <input
        value={values.lastName}
        onChange={handleChange}
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Enter your last name"
        onBlur={handleBlur}
        className={
          errors.lastName && touched.lastName ? styles["input-error"] : ""
        }
      />
      {errors.lastName && touched.lastName && (
        <p className={styles["errors"]}>{errors.lastName}</p>
      )}
      <label htmlFor="age">Age</label>
      <input
        value={values.age}
        onChange={handleChange}
        type="number"
        name="age"
        id="age"
        placeholder="Enter your age"
        onBlur={handleBlur}
        className={errors.age && touched.age ? styles["input-error"] : ""}
      />
      {errors.age && touched.age && (
        <p className={styles["errors"]}>{errors.age}</p>
      )}
      <label htmlFor="address">Delivery Address</label>
      <input
        value={values.address}
        onChange={handleChange}
        type="text"
        name="address"
        id="address"
        placeholder="Enter your delivery address"
        onBlur={handleBlur}
        className={
          errors.address && touched.address ? styles["input-error"] : ""
        }
      />
      {errors.address && touched.address && (
        <p className={styles["errors"]}>{errors.address}</p>
      )}
      <label htmlFor="phone">Phone</label>
      <input
        value={values.phone}
        onChange={handleChange}
        type="text"
        name="phone"
        id="phone"
        placeholder="Enter your phone number"
        onBlur={handleBlur}
        className={errors.phone && touched.phone ? styles["input-error"] : ""}
      />
      {errors.phone && touched.phone && (
        <p className={styles["errors"]}>{errors.phone}</p>
      )}
      <button disabled={isSubmitting} onClick={handleSubmit} type="submit">
        Checkout
      </button>
    </form>
  );
};
export default FormCart;
