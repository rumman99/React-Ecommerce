import {useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "../Product/Product";


const Productinfo = () => {
    const {productkey}= useParams();
    const [productDetails, setProductDetails]= useState([]);

    useEffect(()=>{
        fetch(`http://localhost:3333/product/${productkey}`)
        .then(data => data.json())
        .then(result => setProductDetails(result))

    },[productkey]);
    
    const matchingProduct= productDetails.find(dataProduct => dataProduct.key === productkey);
    
    
    const goHome= useNavigate();
    return (
        <div style={{textAlign:'center'}}>
            <h1 style={{color:'green'}}>Your Product Details:</h1>
            { matchingProduct && <Product showCartButton={false} item={matchingProduct}></Product>}
            {/* <h1>{matchingProduct.name}</h1> */}
            <button style={{padding: "10px", color: "cyan" , fontSize: "15px"}} onClick={()=>goHome(-1)}>Get Back</button>
        </div>    
    );
};

export default Productinfo;