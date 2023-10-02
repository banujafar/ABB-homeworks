import React from "react";
// Context has been created
const ProductContext = React.createContext(false);
// Provider
const ProductProvider = ({ children }) => {
  const [toggle, setToggle] = React.useState(false);
  const toggleFunction = () => {
    setToggle(!toggle);
  };
  return (
    <ProductContext.Provider value={{ toggle, toggleFunction }}>
      {children}
    </ProductContext.Provider>
  );
};
export { ProductContext, ProductProvider };
