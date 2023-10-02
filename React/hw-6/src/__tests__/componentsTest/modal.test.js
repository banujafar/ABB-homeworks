import { fireEvent, waitFor, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import Modal from "../../components/Modal/Modal";

test("should render modal component", () => {
  const propsHeader = "modal-header";
  const onCloseMock = jest.fn();
  render(
    <Provider store={store}>
      <Modal header={propsHeader} onClose={onCloseMock} />
    </Provider>
  );
  const modal = screen.getByTestId("modal");
  expect(modal).toBeInTheDocument();
  const modalHeader = screen.getByTestId("modal-header");
  expect(modalHeader.textContent).toBe(propsHeader);
  const closeBtn = screen.getByText("x");
  expect(closeBtn).toBeInTheDocument();
  fireEvent.click(closeBtn);
  fireEvent.click(closeBtn);
  expect(onCloseMock).toHaveBeenCalledTimes(2);
});

test("should matches DOM snapshot correctly", () => {
  const propsHeader = "modal-header";
  const onCloseMock = jest.fn();
  const tree = render(<Modal header={propsHeader} onClose={onCloseMock} />);
  expect(tree).toMatchSnapshot();
});
