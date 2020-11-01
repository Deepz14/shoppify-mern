import React from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";


export const Checkoutform = () => {

    const stripe = useStripe();

    const elements = useElements();


    const handleSubmit = async(event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });


        if (!error) {

            console.log("Stripe 23 | token generated!", paymentMethod);

            try {
                const { id } = paymentMethod;

                const response = await axios.post("/checkout", {amount: 999, id : id});

                console.log("Stripe 35 | data", response.data.success);

                if (response.data.success) {
                    console.log("CheckoutForm.js 25 | payment successful!");
                }
                else{
                    console.log("CheckoutForm.js 25 | payment Unsuccessful!");
                }
            }
            catch(err){
                console.log('checkoutForm | error :', err);
            }
        }
    }

    
    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
            <CardElement />
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Address" />
            <button className="btn btn-block btn-primary">Pay with Card</button>
        </form>
    )
}
