import React from 'react';
import Card from './Card/Card';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "../App.css";

function Products() {
  const [products, setProducts] = useState([]);
  const productDetails = useSelector(state => state.ProductReducer.products);

  useEffect(() => {
    if(productDetails){
      setProducts(productDetails);
    }
  }, [productDetails]);
  return (
    <div>
    <div className='d-flex flex-wrap card-div'>
    {products.map((product) => {
        return (
          <Card
            key={product.productId}
            id={product.productId}
            pcsubtitle={product.productFamily}
            pctitle={product.productName}
            pcdescription={product.productDescription}
          />
        )
    })}
  </div>
  </div>
  )
}
export default Products;