import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
/* 임시 라우팅 처리 */
import Main from "../pages/main/Main";
import UserList from "../pages/userList/UserList";
// import ComponentName from "../pages/";
// import ComponentName from "../pages/";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/userlist" element={<UserList />}></Route>
            {/* <Route path="/" element={<ComponentName />}></Route>  */}
            {/* <Route path="/" element={<ComponentName />}></Route>  */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
