import React,{useState, useContext ,useEffect} from 'react';
import {Link, useHistory, useParams } from 'react-router-dom';
import {Productcontext} from '../../Productcontext';
import axios from 'axios';
import 'bootstrap/js/src/collapse';
import {CheckoutStripe} from '../checkoutform/CheckoutStripe';
import './style.css';

export const Cartcheckout = () => {

    const [products, setProducts] = useState({});

    const {productId} = useParams()

    const history = useHistory()

    const [state, dispatch] = useContext(Productcontext);

    const [show, setShow] = useState(false);

    const [count, setCount] = useState(0);

    const [quantity, setQuantity] = useState(1);

    const [amount, setAmount] = useState(0)

    const isToken = localStorage.getItem('token');

    useEffect(() => {

        axios.get(`/admin/products/${productId}`, {
        "Content-Type" : "application/json"
        })
        .then(result => {
            setProducts(result.data.product)
            let price = result.data.product.price;
            setAmount(parseInt(price.slice(1)))
        })
        .catch(err => console.log(err))

        if(isToken !== null && state.length > 0){
            setShow(true);
            setCount(state.length);
        }
       
      
    },[])

    const handleQuantity = (e, price) => {
        let total = parseInt(price.slice(1))
        setAmount(total * parseInt(e.target.value))
        setQuantity(parseInt(e.target.value))
    }

    const handleRemove = () => {
        history.push('/');
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
                                    dispatch({type : 'clear'})
                                    history.push('/login')
                                    }}  
                                >       
                                {isToken ? 'logout' : 'login'}
                                </button>    
                            }
                        </li>

                        <li className="nav-item cartIcon p-2" onClick={() => history.push('/cart')}>
                            <svg width="1.8rem" height="1.8rem" viewBox="0 0 16 16" className="bi bi-cart4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                            d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                            </svg>
                            {
                                show ? <span className="totCart">{count}</span>
                                : ''
                            }
                            
                        </li>

                    </ul>
                </div>
            </div>
        </nav>


            <div className="container">
            <div className="row">   
               
                <div className="col-md-6 mt-5">
                    <div className="cartpg-left d-flex align-items-center flex-wrap mb-3">
                              
                        <div className="cartpg-img-container text-center mb-3">
                            <img src={products.image} className="cartpg-Img img-fluid" alt="headphones" />     
                        </div>

                        <div className="cartpg-price-section p-3 mb-3">

                            <label htmlFor="#quanity">Qty : </label>
                            <select name="quantity" id="quantity" className="ml-2" onChange={(e) => handleQuantity(e, products.price)}>
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
                                <li className="list-group-item">Product : {products.name}</li>
                                <li className="list-group-item">Price : {products.price}</li>
                            
                                <button data-image="headphones" data-price="42.00" data-name="Headphones" className="btn btn-sm btn-danger mt-3" onClick={handleRemove}>
                                    Remove
                                </button>  
                            </ul>                         
                        </div>
                              
                    </div>

                </div>

                <div className="col-md-4 mt-5 p-3">

                    <ul className="list-group">
                        <li className="list-group-item text-center list-group-item-dark">PRICE DETAILS</li>
                        <li className="list-group-item">ITEMS : { quantity } ITEMS</li>
                        <li className="list-group-item">PRICE : $ { amount }</li>
                        <li className="list-group-item">TOTAL AMOUNT : $ {amount}</li>
                    </ul>  
                    <CheckoutStripe amount={amount} />
                </div>

            </div>
        </div>

    </div>
    )
}
