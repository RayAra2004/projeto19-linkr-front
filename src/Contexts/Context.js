/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [trendings, setTrendings] = useState([]);
  const [atualizar, setAtualizar] = useState(0);

  return (
    <Context.Provider
      value={{
        trendings,
        setTrendings,
        atualizar,
        setAtualizar,
      }}
    >
      {children}
    </Context.Provider>
  );
};
