import * as yup from "yup";

export const basicSchema = yup.object().shape({
  firstName: yup.string().required("Required!"),
  lastName: yup.string().required("Required!"),
  address: yup.string().required("Required!"),
  age: yup.number().integer().positive().required("Required!"),
  phone: yup.string().required("Required!"),
});
