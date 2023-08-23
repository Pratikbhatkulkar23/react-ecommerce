import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Home from './Page/home';
import SignupPage from './Page/SignupPage';
import LoginPage from './Page/LoginPage';
import CardPage from './Page/CardPage';
import Checkoutpage from './Page/Checkoutpage';
import Productdetails from './Page/productdetails';
import PageNoteFound from './Page/PageNoteFound';
import Protected from './features/auth/Compontes/protected';
import {FetchItemByUsesrIDAsync} from './features/Card/CardSlice';
import {selectLoggedInUser} from './features/auth/Compontes/authSlice';
import OrderSuccess from './Page/order_successful';
import './App.css';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
          <Home></Home>
      </Protected>
    
    ),
  },
  {
    path: "/Login",
    element:(<LoginPage></LoginPage>),
  },
  // Testing
  {
    path: "/Card",
    element:(<Protected><CardPage></CardPage></Protected>),
  },
  {
    path: "/Signup",
    element:(<SignupPage></SignupPage>),
  },
  {
    path: "/Checkout",
    element:(<Protected><Checkoutpage></Checkoutpage></Protected>),
  },
  {
    path: "/Productdetails/:id",
    element:(
    <Protected> <Productdetails></Productdetails> </Protected>
   ),
  },
  {
    path: "/OrderSuccess/:id",
    element:(
    <Protected> <OrderSuccess></OrderSuccess> </Protected>
   ),
  },
  {
    path: "*",
    element:(
    <PageNoteFound></PageNoteFound> 
   ),
  },
]);









function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
 
  
    useEffect(()=>{
      if(user){
        dispatch (FetchItemByUsesrIDAsync(user.id))
      }
    
    },[dispatch,user])
  
  
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
