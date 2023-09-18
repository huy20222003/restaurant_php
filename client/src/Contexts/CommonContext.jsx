import { createContext, useState } from 'react';
import {toast} from 'react-toastify';

export const CommonContext = createContext();

export const CommonProvider = (prop) => {
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleEvolvingFunctionality = ()=> {
    toast.info('Chức năng đang phát triển');
  }


  const commonData = {
   openFormDialog,
   setOpenFormDialog,
   activeStep, 
   setActiveStep,
   handleEvolvingFunctionality,
  };

  return (
    <CommonContext.Provider value={commonData}>
      {prop.children}
    </CommonContext.Provider>
  );
};
