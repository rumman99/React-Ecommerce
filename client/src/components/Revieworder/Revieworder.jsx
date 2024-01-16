

const Revieworder = (props) => {
    const {name, quantity, key, price}= props.reviewpd;
    const removeProduct= props.removeProduct;
    return (
        <div>
            <h4 style={{color:'blue'}}>{name}</h4>
            <h4>Quentity: {quantity}</h4>
            <h4>Price: {price}</h4>
            <div className="product_right">
            <button onClick={()=>removeProduct(key)}>Remove Product</button>
            </div>
        </div>
    );
};

export default Revieworder;