import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

const TabBarVisibilityContext = createContext({
  visible: true,
  setVisible: () => {},
  handleScroll: () => {},
});

export const TabBarVisibilityProvider = ({ children }) => {
  const [visible, setVisibleState] = useState(true);
  const lastOffsetRef = useRef(0);

  const setVisible = useCallback((nextVisible) => {
    setVisibleState(current => current === nextVisible ? current : nextVisible);
  }, []);

  const handleScroll = useCallback((event) => {
    const offsetY = event?.nativeEvent?.contentOffset?.y || 0;
    const delta = offsetY - lastOffsetRef.current;

    if (offsetY < 16) {
      setVisible(true);
    } else if (delta > 8) {
      setVisible(false);
    } else if (delta < -8) {
      setVisible(true);
    }

    lastOffsetRef.current = offsetY;
  }, [setVisible]);

  return (
    <TabBarVisibilityContext.Provider value={{ visible, setVisible, handleScroll }}>
      {children}
    </TabBarVisibilityContext.Provider>
  );
};

export const useTabBarVisibility = () => useContext(TabBarVisibilityContext);
