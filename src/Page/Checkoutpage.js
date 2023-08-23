
import { Link,Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useState } from 'react';
import {UpdateCartAsync, selectcart,DeleteItemFromCartAsync} from '../features/Card/CardSlice';
import { useForm } from "react-hook-form";
import {selectLoggedInUser} from '../features/auth/Compontes/authSlice';
import{UpdateUserAsync} from '../features/auth/Compontes/authSlice';
import {AddOrderAsync} from '../features/order/orderSlice';
import { OrderSuccess} from '../Page/order_successful';
import {selectcurrentOrderPlaceS} from '../features/order/orderSlice';


function Checkout() {
  const { register, handleSubmit, watch,reset, formState: { errors } } = useForm(); 
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items = useSelector(selectcart);
  const placeorderselecter = useSelector(selectcurrentOrderPlaceS);
  const Total_Amount = items.reduce((amount,item)=>item.price*item.quantity +amount,0);
  const Total_Quantity = items.reduce((amount,item)=> item.quantity +amount,0);
  const user = useSelector(selectLoggedInUser);
  const [selectedAddress,SetselectedAddress] = useState(null);
  const [Paymentmethod,SetPaymentmethod] = useState('Cash');


  const Orderhandle = ()=>{
    const order = {items,
      Total_Amount,
      Total_Quantity,
      user,
      selectedAddress,
      Paymentmethod,
      status:'pending',
     
    }
    dispatch(AddOrderAsync(order))
  }
  const handeleQuantity = (e,items)=>{
     console.log(items);
    dispatch(UpdateCartAsync({...items,quantity: +e.target.value}))
  }
  const handleAddress = (e)=>{
    //here coming object object in value we cannot send object so we use index 
    SetselectedAddress(user.address[e.target.value]);
  }
  const handlePayment = (e)=>{
    SetPaymentmethod(e.target.value);
  }
  return (
    <>
    {!items.length && <Navigate to="/" replace="true"></Navigate>}
    {placeorderselecter && <Navigate to={`/OrderSuccess/${placeorderselecter.id}`} replace="true"></Navigate> }
    <div className="mx-auto py-5 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
        <form className='bg-white px-5 py-5 mt-12' onSubmit={handleSubmit((data)=>{
           
           dispatch(UpdateUserAsync({...user,address:[...user.address,data]}))
           reset();


})}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-8">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                  Full Name
                  </label>
                  <div className="mt-3">
                    <input
                      {...register("First_Name")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>


                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                     
                      {...register("Email")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4 ">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                     {...register("Phone")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("country")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>India</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                     {...register("Street_address")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
               
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                     {...register("City")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
               
                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                     {...register("State")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                     {...register("Zip_Code")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Rest
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Address
            </button>
          </div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Address
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
             Choose from existing Address
              </p>
              <ul role="list" className="divide-y divide-gray-100">
      {user.address.map((address,index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5 border-solid border-2 border">
          <div className="flex gap-x-4" >
          <input 
          onChange={handleAddress}
          value={index}
          id="Idcash" name="address" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.First_Name}</p>
              
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.Email}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.city}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.country}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.Street_address}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.State}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.Zip_Code}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.Phone}</p>
            </div>
          </div>
      
        </li>
      ))}
    </ul>
              <div className="mt-10 space-y-10">
               
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                  PAYMENT METHOD
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose One
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        onChange={handlePayment}
                        id="Idcash"
                        name="Payment"
                        value="Cash"
                        type="radio"
                        checked = {Paymentmethod === "Cash"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                       CASH
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                       onChange={handlePayment}
                        id="CARDid"
                        value="Card"
                        name="Payment"
                        type="radio"
                        checked = {Paymentmethod === "Card"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                      CARD
                      </label>
                    </div>
                    {/* <div className="flex items-center gap-x-3">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        No push notifications
                      </label>
                    </div> */}
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

        
        </form>
        </div>
    
        <div className="lg:col-span-2">
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
    

    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
    <h1 className="text-4xl my-10 font-bold tracking-tight text-gray-900">Product</h1>
 
 
         <div className="flow-root">
           <ul role="list" className="-my-6 divide-y ">
             {items.map((items) => (
               <li key={items.id} className="flex py-6">
                 <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                   <img
                     src={items.thumbnail}
                     alt={items.thumbnail}
                     className="h-full w-full object-cover object-center"
                   />
                 </div>
 
                 <div className="ml-4 flex flex-1 flex-col">
                   <div>
                     <div className="flex justify-between text-base font-medium text-gray-900">
                       <h3>
                         <a href={items.href}>{items.name}</a>
                       </h3>
                       <p className="ml-4">${items.price}</p>
                     </div>
                     <p className="mt-1 text-sm text-gray-500">{items.color}</p>
                   </div>
                   <div className="flex flex-1 items-end justify-between text-sm">
                     <div className="text-gray-500">
                     <label htmlFor="password" className="inline mr-2 text-sm font-medium leading-6 text-gray-900">
                 Qty
               </label>
                     <select onClick={(e)=>handeleQuantity(e,items)}>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>  
                     <option value="5">5</option>
                     <option value="6">6</option>    
                     </select>
                     </div>
 
                     <div className="flex">
                       <button
                         type="button"
                         className="font-medium text-indigo-600 hover:text-indigo-500"
                       >
                         Remove
                       </button>
                     </div>
                   </div>
                 </div>
               </li>
             ))}
           </ul>
         </div>
       </div>
  
 
     <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
       <div className="flex justify-between text-base font-medium text-gray-900">
         <p>Subtotal</p>
         <p>${Total_Amount}</p>
       </div>
       <div className="flex justify-between text-base font-medium text-gray-900">
         <p>Quantity</p>
         <p>{Total_Quantity}</p>
       </div>
       <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
       <div className="mt-6">
         <Link to="/OrderSuccess">
         <div
           onClick={Orderhandle}
           className="flex items-center curser-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
         >
           Pay and Order
         </div>
         </Link>
       </div>
       <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
         <p>
           or
           <Link to={"/"}>
           <button
             type="button"
             className="font-medium text-indigo-600 hover:text-indigo-500"
             onClick={() => setOpen(false)}
           >
             Continue Shopping
             <span aria-hidden="true"> &rarr;</span>
           </button>
           </Link>
         </p>
       </div>
     </div>
    </div>
        </div>
      </div>
    </div>  
    </>
  );
}

export default Checkout;
