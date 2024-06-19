import React from 'react';
import Card from './Card/Card';
import HeadingPOV from './HeadingPOV/HeadingPOV';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {

  const [products, setProducts] = useState([]);
  const productDetails = useSelector(state => state.ProductReducer.products);

  useEffect(() => {
    if(productDetails){
      setProducts(productDetails);
    }
  }, [productDetails]);

  return (
        <div>
          <HeadingPOV />
          <div className='d-flex flex-wrap justify-content-center card-div'>
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

export default Dashboard;