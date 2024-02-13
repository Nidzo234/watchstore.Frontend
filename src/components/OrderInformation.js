import { useState } from "react"

export default function OrderIinformation(){
  const [selected, setSelected] = useState(-1);
    return(
        <>
    <div class="container" style={{
      paddingTop: "150px"
    }}>

    <div class="py-5 text-center">
      <h2>Внесете ги податоците за наплата</h2>
    </div>

    <div class="row g-5">
      <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">Кошничка</span>
          <span class="badge bg-primary rounded-pill">3</span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Продукт</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$12</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Продукт</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$8</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Продукт</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
              <h6 class="my-0">Промо код</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span class="text-success">−$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Вкупно (USD)</span>
            <strong>$20</strong>
          </li>
        </ul>

        <form class="card p-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Промо код"/>
            <button type="submit" class="btn btn-secondary">Внеси</button>
          </div>
        </form>
      </div>
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Информации за испорака</h4>
        <form class="needs-validation" novalidate>
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="firstName" class="form-label">Име</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required/>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="lastName" class="form-label">Презиме</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" required/>
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>

            

            <div class="col-12">
              <label for="email" class="form-label">Email <span class="text-muted">(Optional)</span></label>
              <input type="email" class="form-control" id="email" placeholder="you@example.com"/>
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div class="col-12">
              <label for="address" class="form-label">Адреса</label>
              <input type="text" class="form-control" id="address" placeholder="ул. ,, '' бр." required/>
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div class="col-12">
              <label for="address2" class="form-label">Адреса 2<span class="text-muted">(Optional)</span></label>
              <input type="text" class="form-control" id="address2" placeholder="ул. ,, '' бр."/>
            </div>

            <div class="col-md-5">
              <label for="country" class="form-label">Земја</label>
              <select class="form-select" id="country" required>
                <option value="">Choose...</option>
                <option>Македонија</option>
              </select>
              <div class="invalid-feedback">
                Please select a valid country.
              </div>
            </div>

            <div class="col-md-4">
              <label for="state" class="form-label">Град</label>
              <select class="form-select" id="state" required>
                <option value="">Choose...</option>
                <option>Охрид</option>
                <option>Скопје</option>
                <option>Битола</option>
              </select>
              <div class="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>

            <div class="col-md-3">
              <label for="zip" class="form-label">Zip</label>
              <input type="text" class="form-control" id="zip" placeholder="" required/>
              <div class="invalid-feedback">
                Zip code required.
              </div>
            </div>
          </div>

          <hr class="my-4"/>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="same-address"/>
            <label class="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
          </div>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="save-info"/>
            <label class="form-check-label" for="save-info">Save this information for next time</label>
          </div>

          <hr class="my-4"/>

          <h4 class="mb-3">Payment</h4>

          <div class="my-3">
            <div class="form-check">
              <input id="credit" name="paymentMethod" type="radio" class="form-check-input" onClick={e =>setSelected(0)} required/>
              <label class="form-check-label" for="credit">Credit card</label>
            </div>
            <div class="form-check">
              <input id="debit" name="paymentMethod" type="radio" class="form-check-input" onClick={e =>setSelected(1)} required/>
              <label class="form-check-label" for="debit">Плаќање при достава</label>
            </div>

          </div>

         

          <hr class="my-4"/>
          {selected == 0 
          && <a href="/shoppingCart" class="w-100 btn btn-primary btn-lg" type="submit">Нарачај</a>
          }
          {selected == 1 
          && <a href="/orderConfirmation" class="w-100 btn btn-primary btn-lg" type="submit">Нарачај</a>
          }
          
        </form>
      </div>
    </div>


</div>
        </>
    )
}