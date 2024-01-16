import './product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, img, price, seller, stock, key}= props.item;

    return (
        <div className='product'>
            <div className='product_left'>
                <img src={img} alt="" />
            </div>
            <div className='product_right'>
                <h1><Link style={{color:'blue', textDecoration:'none'}} to={'/product/'+key}>{name}</Link></h1>
                <p>Seller: {seller}</p>
                <h3>Price: ${price}</h3>
                <p>Only {stock} left in Stock -Order Soon</p>
                {
                props.showCartButton && 
                <button onClick={()=>props.addCartButton(props.item)}><FontAwesomeIcon icon={faCartPlus}/> Add to Cart</button>
                }
            </div>
        </div>
    );
};

export default Product;