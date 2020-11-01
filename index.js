const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const account = require('./routes/account');
const upload = require('./routes/product');
const uuid = require('uuid');


const {STRIPE_SECRET_KEY, MONGO_URI} = require('./config/keys');


const stripe = require("stripe") (STRIPE_SECRET_KEY);


const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(cors())

mongoose.connect(MONGO_URI, {useNewUrlParser : true, useUnifiedTopology : true})
.then((result)  => {   
    app.listen(PORT, () => {
        console.log(`Server started on running on PORT : ${PORT}`);
    })
})
.catch(err => {
    console.log(err)
})

app.use('/api', account);

app.use('/admin', upload);


// app.post("/checkout", cors(), async(req, res) => {
  
//   let {id, amount } = req.body;
//   console.log("stripe-routes.js 10 | amount and id", amount, id);
//   try {

//     const payment = await stripe.paymentIntents.create({
//       amount: amount * 100,
//       currency: "USD",
//       description: "Product Purchase",
//       payment_method: id,
//       confirm: true,
//       shipping: {
//         name: 'Jenny Rosen',
//         address: {
//           line1: '510 Townsend St',
//           postal_code: '98140',
//           city: 'San Francisco',
//           state: 'CA',
//           country: 'US',
//         },
//       },
//     });

//     console.log("stripe-routes.js 19 | payment", payment);

//     res.json({ message: "Payment Successful", success: true});

//   } 
//   catch (error) {
//     console.log("stripe-routes.js 17 | error", error);

//     res.json({ message: "Payment Failed", success: false});
//   }

// });

app.post('/checkout', (req, res) => {

  const {price, token} = req.body

  const idempontencyKey = uuid.v4()

  return stripe.customers.create({
    email : token.email,
    source : token.id
  })
  .then(customer => {
      stripe.charges.create({
        amount : price * 100,
        currency : 'usd',
        customer : customer.id,
        receipt_email : token.email,
        description : 'Product Purchased',
        shipping : {
          name : token.card.name,
          address : {
              country : token.card.address_country
          }
        }
      }, idempontencyKey)
  })
  .then(result => res.status(200).json(result))
  .catch(err => console.log(err))

})



if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'))
    
    const path = require('path')

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}