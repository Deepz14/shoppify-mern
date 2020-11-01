import React from 'react';
import {Products} from './components/products/Products';
import {Createproduct} from './components/createProduct/Createproduct';
import {Details} from './components/details/Details';
import {CartPage} from './components/cartpage/CartPage';
import {Cartcheckout} from './components/Cartcheckout/Cartcheckout';
import {Signup} from './components/signup/Signup';
import {Login} from './components/login/Login';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {ProductProvider} from './Productcontext';

function App() {

  return (
    <div className="App">

      <ProductProvider>
          <BrowserRouter>    
            <Switch>
              <Route exact path="/" component={Products} />
              <Route path="/admin/product" component={Createproduct} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/details/:productId" component={Details} />
              <Route path="/cart" component={CartPage} />
              <Route path="/checkout/:productId" component={Cartcheckout} />
            </Switch>
          </BrowserRouter>
      </ProductProvider>   

    </div>
  );
}

export default App;
