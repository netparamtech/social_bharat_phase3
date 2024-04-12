// toastOptions.js
const commonOptions = {
    position: 'top-right',
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: 'colored',
    bodyClassName: 'toast-body',
  };
  const commonOptionsForGeneral = {
    position: 'top-center',
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: 'colored',
    bodyClassName: 'toast-body',
  };
export const successOptions = {
    autoClose: 3000,
    ...commonOptions,
  };
  
  export const errorOptions = {
    autoClose: 5000,
    ...commonOptions,
  };
  
  export const infoOptions = {
    autoClose: false,
    ...commonOptions,
  };
  export const generalMessage = {
    autoClose: false,
    ...commonOptionsForGeneral,
  };
  