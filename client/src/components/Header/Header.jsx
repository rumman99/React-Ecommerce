import { NavLink } from "react-router-dom";
import Logo from "../../images/default.png";
import "./header.css";
import { useContext } from "react";
import { userContext } from "../../App";

const Header = ()=> {
    const [userLogin, setUserLogin]= useContext(userContext);
    return (
        <div className="header">
            <a href=""><img src={Logo} alt="" /></a>
            <nav style={{display:'flex'}}>
                <NavLink  className='navLink' to="/">Shop</NavLink>
                <NavLink  className='navLink' to="/review">Review Order</NavLink>
                <NavLink  className='navLink' to="/inventory">Inventory</NavLink>
                { userLogin.email &&<div style={{display:'flex'}}><p>Hello {userLogin.displayName}</p>
                <button onClick={()=> setUserLogin({})} style={{marginLeft:'40px'}}>LogOut</button>
                </div>
                }
            </nav>
        </div>
    );
};

export default Header;