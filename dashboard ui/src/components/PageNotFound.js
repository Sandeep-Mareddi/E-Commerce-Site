import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 
export default function PageNotFound() {
    const validUser = useSelector(state => state.UserReducer.isValid);
    const navigate = useNavigate();
    useEffect(() => {
        if(validUser === false){
            navigate("/");
        }
    })
    return (
        <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
            <div className='text-center'>
                <h1>404 Page not found</h1>
            </div>
            <br />
            <div className="d-flex flex-column">
                <a href='/dashboard'>GO TO HOME</a>
            </div>
        </div>
    )
}