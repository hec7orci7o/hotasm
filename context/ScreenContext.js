import React, { useState, useContext } from "react";

const ScreenContext = React.createContext();

export function useScreen() {
  return useContext(ScreenContext);
}

export function ScreenProvider({ children }) {
  const [docsActive, toggleDocs] = useState(false);
  const [mzLayout, toggleMZ] = useState(false);
  const [hLayout, toggleLY] = useState(false); // pendiente
  const [leftSidebar, toggleLS] = useState(false);
  const [rightSidebar, toggleRS] = useState(false);

  const handleDocs = () => toggleDocs(!docsActive);
  const handleMode = () => {
    if (mzLayout === leftSidebar) {
      toggleMZ(!mzLayout);
      toggleLS(!leftSidebar);
    } else {
      if (mzLayout === true && leftSidebar === false) toggleMZ(false);
      else toggleMZ(true);
    }
  };
  const handleLayout = () => toggleLY(!hLayout);
  const handleSl = () => toggleLS(!leftSidebar);
  const handleSr = () => toggleRS(!rightSidebar);

  return (
    <ScreenContext.Provider
      value={{
        docsActive,
        mzLayout,
        hLayout,
        leftSidebar,
        rightSidebar,
        handleDocs,
        handleMode,
        handleLayout,
        handleSl,
        handleSr,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
}
