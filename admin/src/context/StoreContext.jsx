import { createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

   const BASE_URL =
      import.meta.env.VITE_API_URL ||
      "http://localhost:4000";

   const contextValue = {
      BASE_URL
   };

   return (
      <StoreContext.Provider value={contextValue}>
         {props.children}
      </StoreContext.Provider>
   );
};

export default StoreContextProvider;