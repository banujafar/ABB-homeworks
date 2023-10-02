import { ActionTypes } from "./actionTypes";


export const fetchProducts=async(dispatch)=>{

        try {
          const response = await new Promise((resolve, reject) => {
            fetch("/products.json")
              .then((res) => resolve(res))
              .catch((err) => reject(err));
          });
          const data = await response.json();
          return dispatch({ type: ActionTypes.FETCH_PRODUCTS, payload: data });
        
        } catch (err) {
          console.error("Error:", err);
        }
      };
export const handleModal=()=>{
  
}
    
      