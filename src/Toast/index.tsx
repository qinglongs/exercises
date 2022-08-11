import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import * as ReactDOM from "react-dom";

import "./style.css";

type ToastFunction = {
  error(text: string, otpions: { duration: number }): Promise<any>;
  success(text: string, otpions: { duration: number }): Promise<any>;
};

/** 全局注册 Toast 组件后即可引入 toast 调用 Toast 组件内部的方法 */
export const toast: ToastFunction = {} as ToastFunction;

const Toast = () => {
  const [text, setText] = useState("");

  const [status, setStatus] = useState<keyof ToastFunction>();

  const [visible, setVisible] = useState(false);

  /** 展示弹窗 */
  const show = (status: keyof ToastFunction, text: string, duration = 4) => {
    setText(text);
    setVisible(true);
    setStatus(status);
    return new Promise((resoive) => {
      setTimeout(() => {
        setVisible(false);
        resoive("close");
      }, duration * 1000);
    });
  };

  const error = (text: string, options: { duration: number }) => {
    return show("error", text, options.duration);
  };

  const success = (text: string, options: { duration: number }) => {
    return show("success", text, options.duration);
  };

  useEffect(() => {
    toast.error = error;
    toast.success = success;
  }, []);

  return ReactDOM.createPortal(
    <div className={`toast ${visible ? "show" : "close"} ${status}`}>
      <div className={`icon ${status}`}></div>
      <div className="text">
        <span>{text}</span>
      </div>
    </div>,
    document.body
  );
};

export default Toast;
