import { useEffect, useState } from "react"

export default function InputQuantity({product}){

    const [quantity, setQuantity] = useState(product.quantity)

    const handleChangeQuantity = async(e) =>{
        const newQuantity = parseInt(e.target.value, 10);
        setQuantity(newQuantity); 
        if(newQuantity <= 0){
            try {
                const response = await fetch(`https://localhost:7228/api/ShoppingCart/deleteFromShoppingCart?id=${product.id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error(`Failed to remove item from shopping cart: ${response.status}`);
                }
                console.log('Item removed from shopping cart successfully');
                window.location.reload();
            } catch (error) {
                console.error('Error removing item from shopping cart:', error);
                throw error;
            }

        }
        else{

        const response = await fetch('https://localhost:7228/api/Product/updateQuantity',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(
                {
                    "productId": product.id,
                    "quantity": newQuantity 
                }
            )
        });
        if (response.ok) {
            //refresh the page
            window.location.reload();
        } else {
            console.error("Failed to update quantity!");
        }
        
    }
}


    return(
        <input type="number" className="form-control w-25" onChange={handleChangeQuantity} min={-1}  value={quantity}></input>
    )
}