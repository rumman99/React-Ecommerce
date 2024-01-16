import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fakeData from "../../fakeData";


const Inventory = () => {
    
    const handleAddProducts=()=>{
        fetch('http://localhost:3333/addProducts', {
            method: "POST",
            body: JSON.stringify(fakeData),
            headers: {'Content-Type': 'application/json'}
        })
    }
    // useEffect(()=>{
        
    // },[])
    const goHome = useNavigate()
    return (
        <div style={{textAlign:'center'}}>
            <h1 style={{color:'red'}}>Developer is DEAD!!!</h1>
            <button onClick={handleAddProducts}>Add Products</button>
            <button style={{padding: "10px", color: "cyan" , fontSize: "15px"}} onClick={()=>goHome('/')}>Go Home</button>
        </div>
    );
};

export default Inventory;