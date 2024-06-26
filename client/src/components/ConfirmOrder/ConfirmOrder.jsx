import { useContext } from 'react';
import giffy from '../../images/giphy.gif';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { clearLocalShoppingCart, getDatabaseCart } from '../../utilities/databaseManager';


const ConfirmOrder = () => {
    const [userLogin]= useContext(userContext);

    const errorText= {
        color: 'red'
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => {
//// Send Order Details to Databse ///
        const saveCartData= getDatabaseCart();
        console.log(saveCartData);
        const confirmedOrderDetails={user:{...userLogin}, products: saveCartData, userDetails: data, orderTime: new Date().toDateString("dd/MM/yyyy")}
        fetch('https://am-mart-ecommerce-production.up.railway.app/confirmOrder', {
            method: "POST",
            body: JSON.stringify(confirmedOrderDetails),
            headers: {'Content-Type': 'application/json'}
          })
        clearLocalShoppingCart();
        alert('Your Order Confirmed.... We will Contact with You')
      }
    console.log(watch("example"))
    

    return (
        <>
        <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue={userLogin.displayName} {...register("name", { required: true })} placeholder='Name' />
            <br/>
            <input defaultValue={userLogin.email} {...register("email", { required: true })} placeholder='Email' />
            <br/>
            <input defaultValue={userLogin.phone} {...register("phone", { required: true })} placeholder='Phone' />
            <br/>
            <input {...register("address", { required: true })} placeholder='Address' />
            <br/>
            {/* errors will return when field validation fails  */}
            {errors.address && <span style={errorText}>Address field is required</span>}
            <br/>
            {errors.name && <span style={errorText}>Name field is required</span>}
            <br/>
            {errors.email && <span style={errorText}>Email field is required</span>}
            <br/>
            {errors.phone && <span style={errorText}>Phone field is required</span>}
            <br/>
            <input type="submit" value='Confirm Your Order' />
            </form>
        </div>

            <h1 style={{textAlign:'center'}}>Your Order is Confirmed</h1>
            <img style={{width:'50%', margin:'auto', display:'block'}} src={giffy} alt="" /> 
        </>     
    );
};

export default ConfirmOrder;