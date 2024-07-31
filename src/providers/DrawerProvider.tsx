import {createContext, useState, useContext, ReactNode} from 'react';

interface DrawerContextType {
  drawerState: boolean;
  setDrawerState: (newData: boolean) => void;
}

const DrawerContext = createContext<DrawerContextType>({
  drawerState: false,
  setDrawerState: () => {},
});

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({children}: {children: ReactNode}) => {
  const [drawerState, setDrawerState] = useState(false);

  return (
    <DrawerContext.Provider value={{drawerState, setDrawerState}}>
      {children}
    </DrawerContext.Provider>
  );
};
