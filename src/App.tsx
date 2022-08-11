import "./App.css";

import PageList from "./PageList";

import Toast, { toast } from "./Toast/index";

function App() {
  const onClickShowSuccessToast = (status: keyof typeof toast) => {
    switch (status) {
      case "error":
        toast.error("error!!!", { duration: 1 });
        break;
      case "success":
        toast.success("success!!!", { duration: 2 });
        break;
      default:
        console.log('还没有这个状态！');
        
    }
  };

  return (
    <div className="app">
      <PageList />
      <div>
        <Toast />
        <button onClick={() => onClickShowSuccessToast("success")}>
          button-success
        </button>
        <button onClick={() => onClickShowSuccessToast("error")}>
          button-error
        </button>
      </div>
    </div>
  );
}

export default App;
