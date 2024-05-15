import React, { createContext, useState, useContext } from 'react';

const DrawerContext = createContext();

export const useDrawer = () => useContext(DrawerContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState('');

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
  {children}
  </DataContext.Provider>
);
};
