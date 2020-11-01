import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Checkoutform } from "./Checkoutform";

const PUBLIC_KEY = "pk_test_51Hf5SbEafGUVAMhC4kFmyZnP5BWEy3NEKwxbiazHJTcRpLbS34SfDEkmVdVEUWgABkxb1w7pqHfSZyMrqt69fWk500sb4GUzBO";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
      <div className="container">
          <div className="row">
                <div className="col text-center mt-5">
                    <Elements stripe={stripeTestPromise}>
                        <Checkoutform />
                    </Elements>
                </div>
          </div>
       </div>   
   
  );
};

export default Stripe;