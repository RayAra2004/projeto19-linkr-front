/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [trendings, setTrendings] = useState([]);

  return (
    <Context.Provider
      value={{
        trendings,
        setTrendings,
      }}
    >
      {children}
    </Context.Provider>
  );
};
