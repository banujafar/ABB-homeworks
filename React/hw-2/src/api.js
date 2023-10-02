export const fetchData = async () => {
  try {
    const response = await new Promise((resolve, reject) => {
      fetch("/products.json")
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error:", err);
  }
};
