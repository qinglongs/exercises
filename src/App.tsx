import './App.css';

import PageList from './PageList';

import Toast, { toast } from './Toast/index';

function App() {

  const onClickShowSuccessToast = () => {
    toast.error('消息消息！！', { duration: 1 });
    // toast.success('消息消息！！', { duration: 1 });
  }

  return (
    <div className='app'>
      <PageList />
      <div>
        <Toast />
        <button onClick={onClickShowSuccessToast}>success-toast</button>
      </div>
    </div>
  )
}

export default App;
