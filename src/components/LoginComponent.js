import { useState } from "react";
import { useNavigate } from 'react-router-dom';
function LoginComponent ({setName}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async (e) =>{
        e.preventDefault()

        const response = await fetch('https://localhost:7228/api/Auth/login',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(
                {
                    "email": email,
                    "password": password
                }
            )
        });
        console.log(response.status)
        if(response.status === 200){
            navigate('/');
            setName(response.json.name)
        }
        
    }
    return(
        <div className="container" style={{"padding-top": "120px"}}>
            <div className="row text-center">
                <div className="col-lg-6 col-sm col m-auto">

                    <form onSubmit={submit}>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                        <div className="form-floating m-2">
                        <input data-testid="cypress-email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com" 
                        value={email} onChange={e => setEmail(e.target.value)}/>
                        <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating m-2">
                        <input data-testid="cypress-password" type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        value={password} onChange={e => setPassword(e.target.value)}/>
                        <label htmlFor="floatingPassword">Password</label>
                        </div>

                        
                        <button className="w-100 btn btn-lg btn-primary m-2" type="submit">Sign in</button>
                    </form>
                </div>
             
            </div>
            <div style={{paddingTop: "200px"}}></div>

        </div>
        

        
        
    )
}

export default LoginComponent;