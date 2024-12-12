import { Toaster } from "react-hot-toast";

const AppToaster = () => {
  return (
    <Toaster
      position='top-right'
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#363636",
          color: "#fff",
          zIndex: 9999,
        },
        success: {
          style: {
            background: "#4caf50",
            color: "white",
          },
          icon: "🎉",
        },
        error: {
          style: {
            background: "#f44336",
            color: "white",
          },
          icon: "❌",
        },
        loading: {
          style: {
            background: "#2196f3",
            color: "white",
          },
          icon: "⏳",
        },
      }}
    />
  );
};

export default AppToaster;
