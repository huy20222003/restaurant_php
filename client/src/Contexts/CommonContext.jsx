import { createContext, useState } from 'react';

export const CommonContext = createContext();

export const CommonProvider = (prop) => {
  const [openFormDialog, setOpenFormDialog] = useState(false);


  const commonData = {
   openFormDialog,
   setOpenFormDialog,
  };

  return (
    <CommonContext.Provider value={commonData}>
      {prop.children}
    </CommonContext.Provider>
  );
};
