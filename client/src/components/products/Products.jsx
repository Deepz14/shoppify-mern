import React, {useState, useContext, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom';
import {Productcontext} from '../../Productcontext';
import 'bootstrap/js/src/collapse'
import axios from 'axios';
// import data from '../../data';
import './style.css';

export const Products = () => {
    
    const history = useHistory();

    const [state] = useContext(Productcontext);

    const [products, setProducts] = useState([]);

    const [show, setShow] = useState(false);

    const [count, setCount] = useState(0);

    const isToken = localStorage.getItem('token');

    const handleClick = (productId) => {

        history.push(`/details/${productId}`);   
    }

    useEffect(() => {

        axios.get('/admin/products',{
            headers : {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem('token')
            }
        })
        .then(result => {
            console.log(result.data);
            setProducts(result.data.Products);
        })  
        .catch(err => console.log(err))

        if(isToken !== null && state.length > 0){
            setShow(true);
            setCount(state.length);
        }

    },[])

    const handleCart = () => {
        if(isToken !== null){
            history.push('/cart')
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

                        <li className="nav-item cartIcon p-2" onClick={handleCart}>
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


            <div className="container-fluid">
                <div className="row">
                    <div className="col d-flex flex-wrap justify-content-around align-items-center">
                        {
                            products.map(product => {
                                return (
                                    <div className="card-product" key={product._id}>
                                        <div className="card-img-container">
                                            <img src={product.image} className="cardImg" alt="headphones" />
                                        </div>
                                        <h6 className="product-name ml-3">{product.name}</h6>
                                        <div className="card-footer">
                                            <button data-image="headphones" data-price="42.00" data-name="Headphones" className="btn btn-sm btn-info cartBtn" onClick={() => handleClick(product._id)}>
                                                view Details
                                            </button>   
                                            <span className="price">{product.price}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
       </div> 
    )
}
