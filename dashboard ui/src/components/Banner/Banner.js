import React, { useEffect, useState } from 'react';
import './Banner.css';

function Banner() {
  const [title , setTitle] = useState("Dashboard");
  const url = window.location.pathname;
  useEffect(()=>{
    switch (url) {
      case "/dashboard":
        setTitle("Dashboard");
        break;
      case "/services":
        setTitle("Services")
        break;
        case "/products":
          setTitle("Products");
          break;
        case "/newsletter":
          setTitle("NewsLetter");
          break;
        case "/offers":
          setTitle("Offers");
          break;
        case "/contactus":
          setTitle("Contact Us");
          break;
        case "/thankyoupage":
          setTitle("Contact Us");
          break;
      default:
        break;
    }
  },[url]);
  return (
    <div className='banner'>
      <p className='banner-text'>
        {title}
      </p>
    </div>
  )
}
export default Banner;