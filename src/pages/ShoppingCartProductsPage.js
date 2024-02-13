import { useEffect, useState } from "react";
import InputQuantity from "../components/InputQuantity";
import { Link } from 'react-router-dom';
export default function ShoppingCartProductsPage (){

    const [shoppingCartProducts, setShoppingCartProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://localhost:7228/api/ShoppingCart/shoppingCart', {
                    method: 'GET',
                    credentials: 'include' 
                });
                const data = await response.json();
                setShoppingCartProducts(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        
        fetchProducts();
    }, []);

    const handleRemoveFromShoppingCart = async(id) =>{
        try {
            const response = await fetch(`https://localhost:7228/api/ShoppingCart/deleteFromShoppingCart?id=${id}`, {
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

    const formatNumberWithSpaces = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      };
    return(
        <div className="container" style={{"padding-top": "120px"}}>
         <h1>Your Shopping Cart</h1>
         <table class="table" >
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col"></th>
                            <th scope="col">Производ</th>
                            <th scope="col">Цена</th>
                            <th scope="col">Количина</th>
                            <th scope="col">Вкупно</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
            {shoppingCartProducts.products ? (
                    shoppingCartProducts.products.map((product, index) => (
                          <tr>
                            <td className="align-middle">{index}</td> 
                            <td className="align-middle"><Link to={"/product/" + product.id} state={product}><img src={product.productImage} height={150} onClick={console.log("clicked")}></img></Link></td>
                            <td className="align-middle">{product.productName}</td>
                            <td className="align-middle">{product.productPrice}</td>
                            <td data-testid="cypress-update"className="align-middle"><InputQuantity product = {product}></InputQuantity></td>
                            <td className="align-middle">{product.productPrice*product.quantity} <span className="text-muted"> денари</span> </td>
                            <td data-testid="cypress-delete" className="align-middle"><a className="btn btn-outline-dark" onClick={e=>handleRemoveFromShoppingCart(product.id)}>Избриши производ</a></td>
                          </tr>
                    ))
            ) : (
                <div>Loading products...</div>
            )}
            
            </tbody>
            <tfoot >
                <tr>
                    <td colSpan={5}></td>
                    <td data-testid="cypress-totalPrice" className="fw-bold">{formatNumberWithSpaces(shoppingCartProducts.totalPrice)} денари</td>
                    <td></td>
                 </tr>
            </tfoot>
           </table>
           <Link to={"/orderInformations"} state={shoppingCartProducts} className="btn btn-dark">Продолжете кон наплата</Link>
           <div style={{paddingTop: "240px"}}></div>
            
        </div>
    )
}