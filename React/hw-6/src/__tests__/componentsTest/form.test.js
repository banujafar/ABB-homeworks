import FormCart from "../../components/Form/Form";
import { Provider } from "react-redux";
import { store } from "../../store";
import { render } from "@testing-library/react";

test("should  matches DOM snapshot correctly", () => {
  const { container } = render(
    <Provider store={store}>
      <FormCart />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
