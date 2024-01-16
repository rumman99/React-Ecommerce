
const Cart = (props) => {
    const cartItems= props.cartState;
    // let cartPrice=0;
    // for(let i=0; i<cartItems.length; i++){
    //     let perProduct=cartItems[i].price;
    //     cartPrice+=perProduct;
    // }
    const cartPrice= cartItems.reduce((cartPrice, perProduct) => cartPrice+perProduct.price*perProduct.quantity, 0);
    
    
    // cartPrice*quantity;
    // console.log(cartItems);

let shipping= 0;
if(cartPrice>100){
    shipping= 10;
}
else if(cartPrice>50){
    shipping= 30;
}
else if(cartPrice>20){
    shipping= 50;
}
else if(cartPrice>0){
    shipping= 70;
}

let tax= cartPrice/10;

const numberConvert= (string)=>{
    let convert= Number(string).toFixed(2);
    return convert;
}

// Product Quantity on Cart Show
const allProduct= cartItems;
const getQuantity= allProduct.map(pd=>pd.quantity);
const quantitySum= getQuantity.reduce((initialpd, addedpd)=>initialpd+addedpd,0);

    return (
        <div>
            <h4 id="added">Added Product: {quantitySum}</h4>
            <p>All Product Price: ${numberConvert(cartPrice)}</p>
            <p>Shipping Charge: ${shipping}</p>
            <p>Tax: ${numberConvert(tax)}</p>
            <strong id="total">Total Price: ${numberConvert(tax+shipping+cartPrice)}</strong>
            {
                props.children
            }
        </div>
    );
};

export default Cart;