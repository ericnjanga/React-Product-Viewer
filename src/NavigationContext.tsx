import { createContext, useContext, useState } from "react";

const NavigationContext = createContext({
  isBack: false,
  setIsBack: (value: boolean) => {},
});

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isBack, setIsBack] = useState(false);

  return (
    <NavigationContext.Provider value={{ isBack, setIsBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
