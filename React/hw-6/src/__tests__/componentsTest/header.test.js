import Header from "../../components/Header/Header";
import { Provider } from "react-redux";
import { store } from "../../store";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("should  matches DOM snapshot correctly", () => {
  const { container } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});
