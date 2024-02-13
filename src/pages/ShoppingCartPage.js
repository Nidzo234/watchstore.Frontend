import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";

export default function ShoppingCartPage() {
    const [shoppingCartProducts, setShoppingCartProducts] = useState([]);
    const navigate = useNavigate();
    const stripePromise = loadStripe('pk_test_51OhewXDrr4330jWXP08vnffzGzQyTegkw0kDqDsBiVTZI3F4onWbnKJhxkexClL0i25GSUOnkTe9gr8PzWJ3tD7P007tGOBZNb');
                                      
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://localhost:7228/api/ShoppingCart/shoppingCart', {
                    method: 'GET',
                    credentials: 'include' 
                });
                const data = await response.json();
                setShoppingCartProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        
        fetchProducts();
    }, []);





    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch('https://localhost:7228/api/ShoppingCart/PayOrderReact', {
          method: "POST",
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            { "items": [
                {
                  "id": "string",
                  "amount": "string"
                }
              ] }
            
            ),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []);
    
      const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };


  

    return (
        <div className="container text-center" style={{paddingTop: "150px"}}>
            <h1>Your Shopping Cart</h1>
            {shoppingCartProducts.products ? (
        
                    <div >
                        {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm className="col-10 m-auto" />
                        </Elements>)}
                    </div>
                    
        
            ) : (
                <div>Loading...</div>
            )}
         

            
        </div>
    );
}
