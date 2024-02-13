import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
export default function OrdersPage(){

    
    
    const [orders, serOrders] = useState([])
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
          
            const response = await fetch('https://localhost:7228/api/Order/myOrders',{
            method: "POST",
            credentials: 'include'})

          const data = await response.json();
          serOrders(data);
          console.log(data)
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      const formatNumberWithSpaces = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      };



      const handleGetInvoice = async(orderId) =>{
            // Replace 'id' with the actual order ID
            try {
                fetch(`https://localhost:7228/api/Order/getInvoice?id=${orderId}`, {
                method: 'GET',
                })
                .then(response => response.blob())
                .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'invoice.pdf');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                })
                .catch(error => {
                console.error('Error downloading invoice:', error);
                // Handle error, show message to user, etc.
                });

               
            } catch (error) {
            console.error('Error fetching products:', error);
        }

      }
    return(
        <div className='container'style={{paddingTop: "150px"}}>
        <h1 className='my-4'>Мои Нарачки</h1>
        <Accordion   >
            {orders.map((order, index) => (
                
                <Accordion.Item eventKey={index}  >
                    <Accordion.Header>
                        <span style={{height: "50px"}}></span>
                        <span>Нарачка број #{index+1}</span>
                        <span className='col-3 ms-auto text-end'>11.01.2024</span>
                        <span className='col-3 ms-auto text-end'> {formatNumberWithSpaces(order.totalPrice)} денари</span>
                        <span className='ms-auto col-3 text-end'>Статус: Креирана нарачка</span>
                    </Accordion.Header>
                    <Accordion.Body>
                    <table class="table" >
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Производ</th>
                            <th scope="col">Цена</th>
                            <th scope="col">Количина</th>
                            <th scope="col">Вкупно</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                    {order.products.map((product, rbroj) =>(
                        
                        <tr>
                            <td className="align-middle">{rbroj + 1}</td>
                            <td className="align-middle">{product.productName}</td> 
                            <td className="align-middle">{formatNumberWithSpaces(product.productPrice)} ден.</td>  
                            <td className="align-middle">{product.quantity}</td>
                            <td colSpan={2} className="align-middle">{formatNumberWithSpaces(product.productPrice * product.quantity)} ден.</td>  
                        </tr>
                        

                    ))}
                    </tbody>
                        <tfoot >
                            <tr>
                                <td colSpan={4}><a className='btn btn-outline-dark' onClick={() => handleGetInvoice(order.id)}>Превземи фактура</a></td>
                                <td colSpan={2} className="fw-bold">{formatNumberWithSpaces(order.totalPrice)} денари</td>
                               
                            </tr>
                        </tfoot>
                    </table>
                    
                    </Accordion.Body>
                </Accordion.Item>

            ))}
            
            
        </Accordion>
        <div style={{paddingTop:"200px"}}></div>
        </div>
    )
}