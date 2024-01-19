import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Inventory = () => {
    const productsData={};
    const handleAddProducts=()=>{
        fetch('https://am-mart-ecommerce-production.up.railway.app/addProducts', {
            method: "POST",
            body: JSON.stringify(productsData),
            headers: {'Content-Type': 'application/json'}
        })
    }

    const goHome = useNavigate()
    return (
        <div style={{textAlign:'center'}}>
            <h1 style={{color:'red'}}>Developer is DEAD!!!</h1>
            <form action="" >
                <input type="text" placeholder="Product Name"/><br></br>
                <input type="text" placeholder="Seller Name"/><br></br>
                <input type="number" placeholder="Price"/><br></br>
                <input type="number" placeholder="Quantity"/><br></br>
                <p>Upload Image</p><input type="file" /><br></br><br></br>
                <button onClick={handleAddProducts}>Add Products</button><br></br><br></br>
            </form>
            
            <button style={{padding: "10px", color: "cyan" , fontSize: "15px"}} onClick={()=>goHome('/')}>Go Home</button>
        </div>
    );
};

export default Inventory;