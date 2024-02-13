import { useEffect, useState } from "react";
import ProductCard from "./productCard";
import axios from "axios"
export default function Products (){
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrands, setSelectedBrands] = useState([]);


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
          const response = await fetch('https://localhost:7228/api/Product/products');
          const data = await response.json();
          setProducts(data);
          console.log(data)
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      const filteredProducts = products.filter(product =>
        (searchQuery === '' || product.productName.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedBrands.length === 0 || selectedBrands.some(brand => product.productName.toLowerCase().includes(brand.toLowerCase())))
    );


    const handleCheckbocClick = (brand) =>{
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(item => item !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    }

    const resetFilter = () =>{
        setSearchQuery('');
        setSelectedBrands([]);
    }


    return(
        <div className="container" style={{"padding-top": "120px"}}>
            <h1 data-testiD="cypress-title">Сите часовници</h1>
            <div className="row"> 
                <input
                    type="text"
                    className="form-control my-3 col-6"
                    placeholder="Пребарај часовник според име"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
            <div className="row">
                <div className="col">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="Tissot" checked={selectedBrands.includes("Tissot")} onClick={e => handleCheckbocClick(e.target.value)}/>
                    <label class="form-check-label" for="inlineCheckbox1">Tissot</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="Omega" checked={selectedBrands.includes("Omega")} onClick={e => handleCheckbocClick(e.target.value)}/>
                    <label class="form-check-label" for="inlineCheckbox2">Omega</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="PRX" checked={selectedBrands.includes("Prx")} onClick={e => handleCheckbocClick(e.target.value)}/>
                <label class="form-check-label" for="inlineCheckbox3">Prx</label>
                </div>
                </div>
            </div>
                
            <a className="btn btn-dark my-3" onClick={resetFilter}>Ресетирај филтер</a>
            
        <div data-testid="cypress-productCard" className="row">
            {filteredProducts.map((product, index) => (
                
                <>
                    <ProductCard key={product.id} product={product} />
                </>
                
            
            ))}
        </div>
        </div>
    )
}