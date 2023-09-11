import { Layout, Page } from "@/shared/components";
import { Link } from "react-router-dom";

import { Col, Container, Row, Button } from "react-bootstrap";
import { BagCheck, ChevronLeft } from "react-bootstrap-icons";
import useCart from "@/shared/hooks/store/useCheckout";
import Axios from "axios"
import {useState,useEffect} from "react";
import LineThrough from "../../shared/components/LineThrough";

const Checkout = () => {
  const { clearCart, onCart } = useCart();
  const [ states, setStates ] = useState([]);

  const GetStates = async () => {
    await Axios.get("/us-states.json").then(res => {
      console.log(res.data);
      setStates(res.data);
    });
  }
  const GrandTotal = () => {
    let total = 0;
    onCart.forEach(item => {
      total += +item.our_price;
    });
    return total;
  }

  useEffect(() => {
    console.log("onCart:", onCart);
    GetStates();
  },[])


  return (
    <Page title={"Toner Haven | Checkout"}>
      <Layout header="Checkout">
        <div className={'checkout'}>
          <div className="row">
            {/* Billing Info */}
            <div className="col-md-6">
              <h3>Billing Details</h3>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className={'form-control'}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className={'form-control'}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className={'form-control'}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Company</label>
                    <input type="text" className={'form-control'}/>
                  </div>
                </div>
              </div>

              <br/><hr/><br/>

              <div className="form-group">
                <label>Street Address</label>
                <input type="text" className={'form-control'}/>
              </div>
              <div className="form-group">
                <label>Apartment, suite, unit, etc. (optional)</label>
                <input type="text" className={'form-control'}/>
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" className={'form-control'}/>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>State</label>
                    <select type="text" className={'form-control'}>
                      <option value="">-- select state --</option>
                      {states.map((state,key) => (
                        <option key={key} value={state.abbr}>{state.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Zip code</label>
                    <input type="number" className={'form-control'}/>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="col-md-6">
              <h3>Shipping Details</h3>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className={'form-control'}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className={'form-control'}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className={'form-control'}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Company</label>
                    <input type="text" className={'form-control'}/>
                  </div>
                </div>
              </div>

              <br/><hr/><br/>

              <div className="form-group">
                <label>Street Address</label>
                <input type="text" className={'form-control'}/>
              </div>
              <div className="form-group">
                <label>Apartment, suite, unit, etc. (optional)</label>
                <input type="text" className={'form-control'}/>
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" className={'form-control'}/>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>State</label>
                    <select type="text" className={'form-control'}>
                      <option value="">-- select state --</option>
                      {states.map((state,key) => (
                        <option key={key} value={state.abbr}>{state.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Zip code</label>
                    <input type="number" className={'form-control'}/>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Payment Section */}
          <div className={'mt-5'}>
            <div className="row">
              <div className="col-md-6">
                <h3>Pay via Credit/Debit Card</h3>
                <div className={'payment-cards mb-3'}>
                  <img src="/images/card-thumbnails/card-amex.svg"/>
                  <img src="/images/card-thumbnails/card-dinersclub.svg"/>
                  <img src="/images/card-thumbnails/card-discover.svg"/>
                  <img src="/images/card-thumbnails/card-jcb.svg"/>
                  <img src="/images/card-thumbnails/card-maestro.svg"/>
                  <img src="/images/card-thumbnails/card-mastercard.svg"/>
                  <img src="/images/card-thumbnails/card-visa.svg"/>
                </div>

                {/* Pay with card */}
                <div className="form-group">
                  <label>Card Number</label>
                  <input className={'form-control'} type="text" maxLength={19} autoComplete={'cc-number'} pattern={'*'} placeholder={"1234 5678 9012 3456"}/>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Expiration (MMYY)</label>
                      <div className="row">
                        <div className="col-md-6">
                          <input className={'form-control'} type="text" maxLength="2" placeholder="MM"/>
                        </div>
                        <div className="col-md-6">
                          <input className={'form-control'} type="text" maxLength="2" placeholder="YY"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Card Security Code</label>
                      <input type="text" className="form-control" maxlength="4" placeholder="CVV"/>
                    </div>
                  </div>
                </div>

                <LineThrough text={'OR'}/>

                {/* Pay via Paypal */}
                <Button className={'m-auto d-block btn-lg'} style={{width:'200px'}}>Pay with PayPal</Button>
              </div>

              {/* Cart Items Summary */}
              <div className="col-md-6">
                <div className={'mt-5'}>
                  <h3>Your Order Details</h3>
                  <table className={'table table-striped'}>
                    <thead>
                    <tr>
                      <td>Product</td>
                      <td>Qty.</td>
                      <td>Subtotal</td>
                    </tr>
                    </thead>
                    <tbody>
                    {onCart.map((item,key) => (
                      <tr key={key}>
                        <td>{item.name}</td>
                        <td>1</td>
                        <td>${item.our_price}</td>
                      </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                      <td>Grand Total</td>
                      <td>({onCart.length}) Items</td>
                      <td>${GrandTotal()}</td>
                    </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-between mt-5">
            <Link to={"/cart"}>
              <Button
                className="p-2"
                variant="light"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}>
                <ChevronLeft className="m-1" />
                <span className="m-1">Back to Cart</span>
              </Button>
            </Link>
            <Button className="p-2" hidden={onCart.length <= 0}>
              <BagCheck className="m-1" />
              <span className="m-1">Place Order</span>
            </Button>
          </div>
        </div>{/* .checkout  */}
      </Layout>
    </Page>
  );
};
export default Checkout;
