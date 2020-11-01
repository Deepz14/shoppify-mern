import React, {useState} from 'react'
import axios from 'axios';
import 'bootstrap/js/src/collapse'
import './style.css';
import {useHistory} from 'react-router-dom';

export const Login = () => {

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const history = useHistory()

    const handleLogin = () => {
        
        axios.post('/api/login', {email, password})
        .then(result => {
            
            localStorage.setItem('token', result.data.token);
            
            localStorage.setItem('role', result.data.role);
            
            if(result.data.role === 'admin'){
                history.push('/admin/product')
            }
            else{
                history.push('/');
            }
         
        })
        .catch(err => console.log(err))

    }

    return (
        <div>

        <nav className="navbar navbar-expand-lg navbar-dark ">
            <div className="container-fluid">
                <h5 className="navbar-brand">E Commerce Store</h5>
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
                                    history.push('/signup')
                                    }}  
                                >       
                                Create Account
                                </button> 
                               
                            }
                        </li>

                    </ul>
                </div>
            </div>
        </nav>

            <div className="container">
                <div className="row p-3">
                    <div className="col-md-4 login-card m-auto mt-5 p-2">
            
                        <h4 className="text-center card-title p-3">Login</h4>
                        <div className="card-body d-flex flex-column mt-3">

                            <input type="email" className="inp-field mb-4" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <input type="password" className="inp-field mb-4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            <button className="btn btn-primary mb-3" onClick={handleLogin}>Login</button>
                           
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}
