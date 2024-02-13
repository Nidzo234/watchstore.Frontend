import { Link } from "react-router-dom";

export default function ProductCard({product}){
    function print(id){
        console.log(id);
    }
    const formatNumberWithSpaces = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      };
    return(
    
        <div className="card p-3 col-xl-3 col-lg-4 col-md-6 col-sm-12 border-0" >
            <img src={product.productImage} className="card-img-top" alt="..."/>
            <div className="card-body" >
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text" style={{
                    height: "150px",
                    maxHeight: "140px",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                }}>{product.productDescription}</p>
                <p className="card-text fw-bold text-center">{formatNumberWithSpaces(product.productPrice)} денари</p>
                <div className="row">
                <Link data-testid="cypress-details-button" to={"/product/" + product.id} state={product} className="btn btn btn-outline-dark rounded-0" onClick={e => print(product.id)}>Види детали</Link>
                </div>
            </div>
        </div>
        
    )
}
