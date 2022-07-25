import Routes from "./routes/enviroment.routes";
import DashBoard__NavigateBar from "./components/dashboard/navigation/navBar";
import { useState } from 'react'

function App() {

  let [enableNavigate, setEnableNavigate] = useState(false);

  return (
    <>
      <DashBoard__NavigateBar enableNavigate={enableNavigate}/>
      <Routes enableNavigate={enableNavigate} setEnableNavigate={setEnableNavigate}/>
    </>
  )
}

export default App;
