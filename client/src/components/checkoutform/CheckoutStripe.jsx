import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const REACT_APP_KEY =  'pk_test_51Hf5SbEafGUVAMhC4kFmyZnP5BWEy3NEKwxbiazHJTcRpLbS34SfDEkmVdVEUWgABkxb1w7pqHfSZyMrqt69fWk500sb4GUzBO'

export const CheckoutStripe = ({amount}) => {

    console.log(REACT_APP_KEY)

    const makePayment = token => {
        const body = {
            token,
            price : amount
        }
        return axios.post('/checkout', body)
        .then(response => {
            const {status} = response
            console.log(response)
            if(status === 200){
                window.location.href = "/"
            }
            else{
                console.log(status)
            }

        })
        .catch(err => console.log(err))
    }

    return(
        <StripeCheckout stripeKey={REACT_APP_KEY}
        token={makePayment}
        name="Pay for Product"
        amount = {amount * 100}
        shippingAddress
        billingAddress
        >
        <button className="btn btn-block btn-primary">
            Pay with Card
        </button>
        </StripeCheckout>
    )
}