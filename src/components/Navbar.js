import { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "./Context";
export default function Navbar({name}){

    const userData =useContext(Context)

    const logout = async () => {
        console.log("clicked")
        const response = await fetch('https://localhost:7228/api/Auth/logout',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
    }


    let menu;
    if(!name){
        menu=(
        <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
        </div>
        )
    }
    else{
        menu=(
            <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                <Link className="nav-link" to="/#">Hi {name}</Link>
                <a className="nav-link" href="/login" onClick={logout}>Logout</a>
            </div>
            )

    }
                        
                        
 
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
             <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">                
                        {menu}
                </div>
            </div>
        </nav>
        
    )
}