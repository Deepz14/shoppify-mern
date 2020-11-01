import React, {useState,useContext,useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {Productcontext} from '../../Productcontext';
import 'bootstrap/js/src/collapse'
import axios from 'axios';
import './style.css';

export const Details = () => {

    const history = useHistory();

    const {productId} =  useParams()

    const [state, dispatch] = useContext(Productcontext);

    const [product, setProduct] = useState({});

    const [show, setShow] = useState(false);

    const [count, setCount] = useState(0);


    const isToken = localStorage.getItem('token');


    useEffect(() => {
        
        axios.get(`/admin/products/${productId}`,{
            "Content-Type" : "application/json"
        })
        .then(result => {
            // console.log(result.data);
            setProduct(result.data.product)
        })
        .catch(err => console.log(err))

        if(isToken !== null && state.length > 0){
            setShow(true);
            setCount(state.length);
        }
      
    },[])

    const handleCart = (cart) => {

        if(state.length > 0 || isToken !== null){
            const filterState = state.filter(item => item._id === cart._id);
            
            if(filterState.length > 0)
            {
                alert('already added to the cart');
            }
            else
            {
                dispatch({type : 'cart' , payload : cart})
                setShow(true);
                setCount(state.length + 1);
            }

        }
        else{
            dispatch({type : 'cart' , payload : cart});
            history.push('/login');
        }

    }

    const handleBuy = (id) => {
        if(isToken !== null){

            const filterState = state.filter(item => item._id === id);

            if(filterState.length > 0){
                dispatch({type : "remove", payload : id})
                history.push(`/checkout/${productId}`)
            }
            else{
                history.push(`/checkout/${productId}`)
            }
           
        }
        else{
            history.push(`/login`)
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
                    <div>
                        <button className="btn btn-warning mt-3" onClick={() => history.push('/')}>Continue Shopping</button>
                        <div className="col details-section d-flex justify-content-evenly align-items-center flex-wrap p-4">

                            <div className="detail-img-container text-center col-md-6">
                                <img src={product.image} className="detail-Img" alt="headphones" />       
                            </div>
                            <div className="detail-price-section col-md-6">
                                <h4> Product : {product.name}</h4>
                                <h4> Price : {product.price}</h4>
                                <button className="btn btn-sm btn-info mr-2" onClick={() => handleCart(product)}>
                                    Add to cart
                                </button>  
                                <button className="btn btn-sm btn-warning" onClick={() => handleBuy(product._id)}>
                                    Buy Now
                                </button>
                            </div>

                        </div>
                    </div> 
                    
                </div>
            </div>

       </div> 
    )
}
