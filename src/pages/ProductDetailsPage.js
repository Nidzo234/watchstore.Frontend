import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import ProductImage from "../components/ProductImage";

export default function ProductDetailsPage () {
    const params = useParams();
    const location = useLocation();
    const product = location.state;
    console.log(location.state)
    const [quantity, setQuantity] = useState('1')
    const [modal, setModal] = useState(false)
    if (!product) {
      return <div>Loading Product...</div>;
    }

    const handleAddProductToCart = async (e) =>{   
        e.preventDefault();
        const response = await fetch('https://localhost:7228/api/Product/AddToCart',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(
                {
                    "selectedProductId": params.id,
                    "quantity": quantity
                }
            )
        });
        if (response.status === 200)
        {
            setModal(true);
        }

    }

    const handleClose = () => setModal(false);
    return(
        <div className="container" style={{
          paddingTop: "120px"
        }}>
          <h1>{product.productName}</h1>
          <div className="row">
            <div className="col-xl-6 col-lg-12">
                <ProductImage image={product.productImage}></ProductImage>
            </div>
            <div className="col-xl-6 col-lg-12">
            <p>{product.productDescription}</p>
          <p data-testid="cypress-productPrice" className="fs-4 m-1">{product.productPrice}<span>денари</span></p>
          <p className="m-1">Со вклучено ДДВ</p>
          <p className="text-muted mt-1 ms-1 md-5">На залиха</p>
          <form className="border-top" onSubmit={handleAddProductToCart}>
              <label htmlFor="quantity" style={{paddingTop: "30px"}}>SelectQuantity </label>
              <div className="row">
              <input type="number" className="form-control mx-2"  id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}
              style={{
                width: "80px"
              }}></input>
              <button data-testid="cypress-addButton" type="submit" className="btn btn-outline-dark rounded-0 col-5">Додади во кошничка</button>
              </div>
              
          </form>
          <div className="border-top" style={{marginTop: "30px"}}></div>
          <div>
            <p>Информации за испорака
            </p>
            <p className="text-muted">Бесплатна достава на нарачка поголема од 2000 денари
              Испорака во рок од 5-10 дена</p>
          </div>
            </div>
          </div>

          
          <Modal show={modal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Успешно додаден продукт</Modal.Title>
          </Modal.Header>
          <Modal.Body>Производот е успешно додаден во вашата кочничка</Modal.Body>
          <Modal.Footer>
            <Link data-testid="cypress-modalbutton"to={"/shoppingCartProducts"} className="btn btn-success"variant="secondary" onClick={handleClose}>
              Види кошничка
            </Link>
            <Link to={"/"} className="btn btn-secondary" variant="primary" onClick={handleClose}>
              Продолжете со купување
            </Link>
          </Modal.Footer>
        </Modal>
        
        
        
        </div>
        
    )
}