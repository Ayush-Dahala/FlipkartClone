import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({children}) => {
  const [loginName, setLoginName] = useState('');
  return (
    <DataContext.Provider
      value={{
        loginName,
        setLoginName,
      }}
    >{children}</DataContext.Provider>
  );
};

export default DataProvider;
