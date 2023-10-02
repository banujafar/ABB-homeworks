import { fireEvent, waitFor } from "@testing-library/react";
import Button from "../../components/Button/Button";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render as rtlRender, screen } from "@testing-library/react";
import { store } from "../../store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  products: {
    products: [
      {
        name: "Infinix Hot 30i 4/128 GB Blue",
        price: 849.5,
        imagePath: "https://www.mp.cz/media/photos/2023/06/06/148677-07.jpg",
        sku: "PHN-008",
        color: "Blue",
        count: 3,
      },
    ],
  },
  cart: {
    cart: [
      {
        name: "Infinix Hot 30i 4/128 GB Blue",
        price: 849.5,
        imagePath: "https://www.mp.cz/media/photos/2023/06/06/148677-07.jpg",
        sku: "PHN-008",
        color: "Blue",
        count: 3,
      },
    ],
  },
  favorites: {
    favorites: [
      {
        name: "Infinix Hot 30i 4/128 GB Red",
        price: 849.5,
        imagePath: "https://www.mp.cz/media/photos/2023/06/06/148677-07.jpg",
        sku: "PHN-008",
        color: "Blue",
        count: 4,
      },
    ],
  },
};
const mockProductData = {
  name: "Infinix Hot 30i 4/128 GB Blue",
  price: 849.5,
  imagePath: "https://www.mp.cz/media/photos/2023/06/06/148677-07.jpg",
  sku: "PHN-008",
  color: "Blue",
  count: 3, // Initial count
};

const render = (component, mockStore) =>
  rtlRender(<Provider store={mockStore || store}>{component}</Provider>);

test("renders the Button component", () => {
  //Create tested props
  const propsText = "test button";
  const propsBgColor = "green";
  const mockFn = jest.fn();

  //Render Button component
  const { container } = render(
    <Button text={propsText} backgroundColor={propsBgColor} onClick={mockFn} />
  );

  //Find an element in component
  const button = screen.getByRole("button");
  const buttonForClassname = container.getElementsByClassName(
    `${propsBgColor}`
  );

  fireEvent.click(button);

  //Assertion-make sure the component is doing what is expected
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent(propsText);
  expect(buttonForClassname).toHaveLength(1);
  expect(mockFn).toHaveBeenCalledTimes(1);
});

test("should matches DOM snapshot correctly", () => {
  const propsText = "test button";
  const propsBgColor = "green";
  const mockFn = jest.fn();
  const tree = render(
    <Button text={propsText} backgroundColor={propsBgColor} onClick={mockFn} />
  );
  expect(tree).toMatchSnapshot();
});

describe("render productCart component and test its buttons", () => {
  const store = mockStore(initialState);
  test("should render removeCart button", async () => {
    render(<ProductCard product={mockProductData} removeIcon={true} />, store);
    const button = screen.getByTestId("remove-product");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const actions = store.getActions();
    expect(actions[0].payload.id).toBe("confirm delete");
  });

  test("should render decrease button", async () => {
    const store = mockStore(initialState);
    render(<ProductCard product={mockProductData} removeIcon={true} />, store);

    const button = screen.getByText("-");
    expect(button).toBeInTheDocument();

    const countElement = screen.getByTestId("count");
    expect(countElement.textContent).toBe("3");

    fireEvent.click(button);
    fireEvent.click(button);

    const actions = store.getActions();
    expect(actions[0].type).toBe("DECREASE_CART_PRODUCTS");
    expect(actions[0].payload[0].count).toBe(2);
    expect(actions).toHaveLength(2);
  });

  test("should render increase button", async () => {
    const store = mockStore(initialState);
    render(<ProductCard product={mockProductData} removeIcon={true} />, store);

    const button = screen.getByText("+");
    expect(button).toBeInTheDocument();

    const countElement = screen.getByTestId("count");
    expect(countElement.textContent).toBe("3");

    fireEvent.click(button);
    fireEvent.click(button);

    const actions = store.getActions();
    expect(actions[0].type).toBe("INCREASE_CART_PRODUCTS");
    expect(actions[0].payload[0].count).toBe(4);
    expect(actions).toHaveLength(2);
  });

  test("should render add to cart button", async () => {
    const store = mockStore(initialState);
    render(<ProductCard product={mockProductData} removeIcon={false} />, store);

    const button = screen.getByText("Add to Cart");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    const actions = store.getActions();

    expect(actions[0].payload.id).toBe("confirm add to cart");
  });

  test("should render add to favorites button", async () => {
    const store = mockStore(initialState);
    render(<ProductCard product={mockProductData} removeIcon={false} />, store);

    const button = screen.getAllByRole("button")[1];

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    const actions = store.getActions();
    expect(actions[0].type).toBe("GET_FAVORITES_PRODUCTS");
    expect(actions[0].payload).toHaveLength(2);
    expect(actions[0].payload.includes(mockProductData)).toBeTruthy();
  });
});
