import { createContext, useState } from "react";

export const ContextSearch = createContext();

export const UpdateSearchBar = ({ children }) => {
    const [users, setUsers] = useState(undefined);
  
    return (
      <ContextSearch.Provider
        value={{
          users,
          setUsers,
        }}
      >
        {children}
      </ContextSearch.Provider>
    );
  };