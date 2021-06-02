// import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
// import React, {useState} from "react";
// import ApiService from "../api";
// const CheckoutForm = () => {
//   const [error, setError] = useState(null);
//   const [email, setEmail] = useState('');
//   const stripe = useStripe();
//   const elements = useElements();

// // Handle real-time validation errors from the CardElement.
// const handleChange = (event) => {
//   if (event.error) {
//     setError(event.error.message);
//   } else {
//     setError(null);
//   }
// }
// // Handle form submission.
// const handleSubmit = async (event) => {
//   event.preventDefault();
  
//   const {paymentMethod, error} = await stripe.createPaymentMethod({
//     type: 'card',
//     card: card
//   });
//   //add these lines
//   ApiService.saveStripeInfo({
//     email, payment_method_id: paymentMethod.id})
//   .then(response => {
//     console.log(response.data);
//   }).catch(error => {
//     console.log(error)
//   })
  
// };
// return (
//   <form onSubmit={handleSubmit} className="stripe-form">
//     <div className="form-row">
//       <label htmlFor="email">Email Address</label>
//       <input className="form-input" id="email" name="name"    type="email" placeholder="jenny.rosen@example.com" required 
// value={email} onChange={(event) => { setEmail(event.target.value)}} />
//     </div>
//     <div className="form-row">
//       <label for="card-element">Credit or debit card</label> 
//       <CardElement id="card-element" onChange={handleChange}/>
//       <div className="card-errors" role="alert">{error}</div>
//     </div>
//     <button type="submit" className="submit-btn">
//       Submit Payment
//     </button>
//   </form>
//  );
// };
// export default CheckoutForm;