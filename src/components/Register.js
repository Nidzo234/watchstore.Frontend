import { useState } from "react"
import  { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
export default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async (e) =>{
        e.preventDefault()
        const response = await fetch('https://localhost:7228/api/Auth/register',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "name": name,
                    "email": email,
                    "password": password
                }
            )
        });
        const content = await response.json();
        console.log(content);

        if (response.status ===201){
            console.log("Uspesno dodaden korisnik");
            setName('');
            setEmail('');
            setPassword('');
            navigate('/login');
        }
            
        else
            console.log("Korisnikot ne e dodaden");
        
    }

    
    
    return(
        <div className="row">
            <div className="col text-center">
            <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Register</h1>

            <div className="form-floating m-2">
                <input data-testid="username" type="username" className="form-control" id="floatingName" value = {name} placeholder="username"
                onChange={e => setName(e.target.value)}/>
                <label htmlFor="floatingInput">Username</label>
            </div>

            <div className="form-floating m-2">
                <input data-testid="email" type="email" className="form-control" id="floatingEmail" value = {email} placeholder="email"
                onChange={e => setEmail(e.target.value)}/>
                <label htmlFor="floatingPassword">Email</label>
            </div>

            <div className="form-floating m-2">
                <input data-testid="cypress-password" type="password" className="form-control" id="floatingPassword" value = {password} placeholder="password"
                onChange={e => setPassword(e.target.value)}/>
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary m-2" type="submit">Register user</button>
        </form>
            </div>
        </div>
        
    )
}