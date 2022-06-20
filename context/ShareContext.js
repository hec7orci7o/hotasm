import React, {useState, useContext} from 'react';

const ShareContext = React.createContext();

export function useShare() {
  return useContext(ShareContext);
}

export function ShareProvider({children}) {
  const [popUp, setPopUp] = useState(false);

  const handleOpen = () => {
    setPopUp(true);
  };

  const handleClose = () => {
    setPopUp(false);
  };

  return (
    <ShareContext.Provider
      value={{
        popUp,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </ShareContext.Provider>
  );
}
