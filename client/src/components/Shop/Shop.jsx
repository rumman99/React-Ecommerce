import { useEffect, useState } from 'react'
import './shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
// Product State
    const [product, setProduct] = useState([])

//Show All Product From Database
    useEffect(()=>{
        fetch('https://am-mart-server.onrender.com/')
        .then(data => data.json())
        .then(result => setProduct(result))
        .catch(err => console.log(err))
    },[]);


// Cart State
    const [cart, setCart] =useState([]);
// Get From Database
    useEffect(()=>{
        const getProductDB= getDatabaseCart();
        const productKey= Object.keys(getProductDB);

        fetch('https://am-mart-server.onrender.com/productsReview', {
            method: "POST",
            body: JSON.stringify(productKey),
            headers: {"Content-Type":"application/json"}
        })
        .then(res=> res.json())
        .then(result => setCart(result))

        // if(product.length > 0){
        //     const allProduct= productKey.map(productKey => {
        //         const matchProduct= product.find(pd => pd.key === productKey);
        //         matchProduct.quantity= getProductDB[productKey];
        //         return matchProduct;
        //     })
        //     setCart(allProduct)
        // }
    }, []);

    const addCartButton= (pd)=>{
        const addedProduct= cart.find(product => product.key === pd.key);
        let count= 1;
        let newCart;
//Assign Quantity of Products
        if(addedProduct){
            count= addedProduct.quantity+1;
            addedProduct.quantity= count;
            const otherProduct= cart.filter(product => product.key !== pd.key);
            newCart= [...otherProduct, addedProduct];
            setCart(newCart)
        }
        else{
            pd.quantity=count;
            setCart([...cart, pd]);
        }
        // document.getElementById('added').style.color='green';
        // document.getElementById('total').style.color='red';

        //Add Local Storage:
        addToDatabaseCart(pd.key, count);
    }

    return (
        <div className='shop'>
            <div className='shop_left'>
            {product.map(allItem => <Product key={allItem.key} addCartButton={addCartButton} item={allItem} showCartButton={true}></Product>)}
            </div>
            <div className='shop_right'>
            <Cart cartState={cart}>
                <div>
                <Link className='product_right' to='/Review'>
                    <button style={{marginTop:'20px', padding:'20px'}}>Review Order</button>
                </Link>
                </div>
            </Cart>
            </div>
        </div>
    );
};

export default Shop;