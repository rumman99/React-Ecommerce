import { useContext, useState } from 'react';
import giffy from '../../images/giphy.gif';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';


const ConfirmOrder = () => {
    const errorText= {
        color: 'red'
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => console.log(data)
    console.log(watch("example"))

    const [userLogin]= useContext(userContext);

    return (
        <>
        <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue={userLogin.displayName} {...register("name", { required: true })} placeholder='Name' />
            <br/>
            <input defaultValue={userLogin.email} {...register("email", { required: true })} placeholder='Email' />
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
            <input type="submit" />
            </form>
        </div>

            <h1 style={{textAlign:'center'}}>Your Order is Confirmed</h1>
            <img style={{width:'50%', margin:'auto', display:'block'}} src={giffy} alt="" /> 
        </>     
    );
};

export default ConfirmOrder;