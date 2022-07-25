import React, {useEffect} from "react";
import DashBoard__NavigateBar from "../../components/dashboard/navigation/navBar";

function Homepage({setEnableNavigate}) {


  useEffect(() => {
    setEnableNavigate(true);
  }, [])

  return (
    <>
      {/* <DashBoard__NavigateBar /> */}
      <div>
        <h1>hOMEPAGE</h1>
      </div>
    </>
  );
}


export default Homepage;