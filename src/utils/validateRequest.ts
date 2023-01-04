import { toast } from "react-toastify";

export const validateRegister = (nameArr: string[]) => {
  if (nameArr.length === 1) {
    toast(
      "We will duplicate your name, your first and last name will be the same",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  }
  if (nameArr.length > 2) {
    toast("we will only take your first and last name", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
