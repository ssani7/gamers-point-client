import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import Products from './Pages/Shared/Products/Products';
import Header from './Pages/Home/Header/Header';
import Productdetails from './Pages/Productdetails/Productdetails';
import ManageProducts from './Pages/ManageProducts/ManageProducts';
import Login from './Pages/Login/Login/Login';
import AddProducts from './Pages/AddProducts/AddProducts';
import { ToastContainer } from 'react-toastify';
import PassLogin from './Pages/Login/PassLogin/PassLogin';
import RequireAuth from './Pages/Login/RequireAuth/RequireAuth';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/register' element={<PassLogin></PassLogin>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/products/:length' element={<Products></Products>}></Route>
        <Route path='/manageProducts' element={
          <RequireAuth>
            <ManageProducts></ManageProducts>
          </RequireAuth>}>
        </Route>
        <Route path='/addProducts' element={
          <RequireAuth>
            <AddProducts></AddProducts>
          </RequireAuth>}>
        </Route>
        <Route path='/inventory/:id' element={<Productdetails></Productdetails>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
