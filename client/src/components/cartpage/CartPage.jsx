import React,{useEffect, useState ,useContext } from 'react'
import {Link, useHistory} from 'react-router-dom';
import {Productcontext} from '../../Productcontext';
import 'bootstrap/js/src/collapse';
import {CheckoutStripe} from '../checkoutform/CheckoutStripe';
import './style.css';

export const CartPage = () => {

    const isToken = localStorage.getItem('token');

    const [state, dispatch] = useContext(Productcontext);

    const history = useHistory();

    const [products, setProducts] = useState([]);

    const [quantity, setQuantity] = useState(1);

    const [amount, setAmount] = useState(0);

    useEffect(() => {

        if(state.length > 0){
            setProducts(state);
            let total = 0;
            state.forEach(item => {
                let price = parseInt(item.price.slice(1));
                total += price

            })
            setAmount(total)
            setQuantity(state.length)
        }
        else{
            history.push('/')
        }

    },[])

    const handleQuantity = (e, price, id) => {

        let total = parseInt(price.slice(1))
        let qty = parseInt(e.target.value)
        let sum = total * qty
        dispatch({type : "qty", payload : {id, qty}})

        const filterProducts = state.filter(item => item._id !== id)
      
     
        if(filterProducts.length > 0){
             let temp = 0;
             let totQty = 0
             filterProducts.forEach(item => {
                let price = parseInt(item.price.slice(1));
                let qty = parseInt(item.qty)
                let mul = price * qty
                totQty += qty
                temp += mul;
            })
            setAmount(temp + sum)
            setQuantity(qty + totQty)
        }else{
            setAmount(sum)
            setQuantity(qty)
        }
       
    }
   
    const handleRemove = (id) => {
        dispatch({type : "remove", payload : id})
                
        if(state.length > 1){
            let total = 0;
            let totQty = 0;
            console.log(state);

            const filterProducts = state.filter(item => item._id !== id)

            filterProducts.forEach(item => {
                let price = parseInt(item.price.slice(1));
                let qty = parseInt(item.qty)
                let mul = price * qty
                totQty += qty
                total += mul;         
            })
            setProducts(filterProducts);
            setAmount(total)
            setQuantity(totQty)
        }
        else{
            history.push('/')
        }

    }

    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark ">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                <h5>E Commerce Store</h5>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto align-items-center justify-content-between">

                        <li className="nav-item p-2">            
                            {
                                <button className="btn btn-sm btn-outline-warning mr-2"
                                    onClick={() => {
                                    localStorage.clear()
                                    history.push('/login')
                                    }}  
                                >       
                                {isToken ? 'logout' : 'login'}
                                </button> 
                               
                            }
                        </li>

                        <li className="nav-item cartIcon p-2">
                            <svg width="1.8rem" height="1.8rem" viewBox="0 0 16 16" className="bi bi-cart4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                            d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                            </svg> 
                        </li>

                    </ul>
                </div>
            </div>
        </nav>

        <div className="container">
            <div className="row">   
               
                <div className="col-md-6 mt-5">
                    <div className="cartpg-left d-flex align-items-center flex-wrap mb-3">
                        {
                           products.length > 0 ? products.map((product, index) => {
                                return(
                                    <div key={index}>
                                    <div className="cartpg-img-container text-center mb-3">
                                        <img src={product.image} className="cartpg-Img img-fluid" alt="headphones" />   
                                    </div> 

                                    <div className="cartpg-price-section p-3 mb-3">

                                        <label htmlFor="#quanity">Qty : </label>
                                        <select name="quantity" id="quantity" className="ml-2" onChange={(e) => handleQuantity(e, product.price, product._id)}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                        </select>

                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Product : {product.name}</li>
                                            <li className="list-group-item">Price : {product.price}</li>
                                        
                                            <button data-image="headphones" data-price="42.00" data-name="Headphones" className="btn btn-sm btn-danger mt-3" onClick={() => handleRemove(product._id)}>
                                                Remove
                                            </button>  
                                        </ul>
                             
                                    </div> 
                                    </div>
                                )
                            }) : 'No Items Added to the cart'
                        }                       
                    </div>
                </div>

                <div className="col-md-4 mt-5 pt-2">

                    <ul className="list-group">
                        <li className="list-group-item text-center list-group-item-dark">PRICE DETAILS</li>
                        <li className="list-group-item">ITEMS : { quantity } ITEMS</li>
                        <li className="list-group-item">PRICE : $ {amount}</li>
                        <li className="list-group-item">TOTAL AMOUNT : $ {amount}</li>
                    </ul>  
                    <CheckoutStripe amount={amount} />
                </div>

            </div>
        </div>

      </div>  
    )
}
