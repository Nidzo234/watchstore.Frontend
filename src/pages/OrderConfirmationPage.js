import { useEffect } from "react"

export default function OrderConfirmationPage(){

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://localhost:7228/api/ShoppingCart/Order', {
                    method: 'GET',
                    credentials: 'include' 
                });
                const data = await response.json();
            } catch (error) {
                console.error('Error cannot delete products from the cart:', error);
            }
        };
        
        fetchProducts();
    }, []);
    return(
        <div className="text-center m-5" style={{
            paddingTop:"170px"
        }}>
            <h1 className="text-success m-5">Вашата нарачка е успешно додадена!!!</h1>
            <h3 className="text-muted m-5">Ви благодариме за довербата!!!</h3>
            <p style={{paddingBottom: "300px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et consectetur turpis. Aenean cursus tortor non justo cursus rutrum. Quisque nec aliquet lectus, nec congue ante. Curabitur interdum aliquam quam vitae eleifend. Phasellus nec volutpat ex, eget efficitur lorem. Aenean consectetur sem sollicitudin tincidunt porta. Quisque mollis sit amet ipsum sed egestas. Aenean volutpat orci et ante venenatis, vel bibendum libero eleifend. Nam sed enim sit amet diam pulvinar sollicitudin quis in elit. Proin at libero tortor. Quisque elementum tincidunt leo eu pretium.</p>
        </div>
    )
}