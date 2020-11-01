import React,{useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import 'bootstrap/js/src/collapse';
import './style.css';
import axios from 'axios';

export const Createproduct = () => {

    const history = useHistory();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        if(url){
            const body = {name, price, img : url}
            axios.post('/admin/upload', body,
                {
                    headers : {
                        "Content-Type" : "application/json",
                        "auth-token" : localStorage.getItem('token')
                    }
                        
                }
            ).then(result => {
                console.log(result.data)
                setName('');
                setPrice('');
                setImage('')
            })
            .catch(err => console.log(err))

        }
    },[url])

    const postDetails = () => {
      const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "products")
        data.append("cloud_name", "deepzcloud")

        axios.post('https://api.cloudinary.com/v1_1/deepzcloud/image/upload', data)
        .then(result => {
            console.log(result.data)
            setUrl(result.data.url)
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
                            
                            <button className="btn btn-sm btn-outline-warning mr-2"
                                onClick={() => {
                                localStorage.clear()
                                history.push('/login')
                                }}  
                            >       
                                Logout
                            </button> 
                            
                        </li>

                        <li className="nav-item">
                            <button className="btn btn-sm btn-outline-info mr-2">
                                Admin
                            </button>       
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
            
            
                <div className="card createpost-card m-auto mt-5 p-3">
                    <input type="text" className="file-inp mb-3" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" className="file-inp mb-3" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <input type="file" className="form-control-file mb-3" placeholder="uploadImage" onChange={(e) => setImage(e.target.files[0])} />
                    <button className="btn btn-primary mt-4" onClick={postDetails}>Upload</button>
                </div>
         
        </div>
    )
}
