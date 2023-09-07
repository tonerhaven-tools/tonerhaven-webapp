import {useEffect,useState,useRef} from "react";
import ServerAxios, {server_url} from "../../../shared/http/ServerAxios";

export default function Overview() {
  const [ brands, setBrands ] = useState([]);
  const [ products, setProducts ] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const [ modalActive, setModalActive ] = useState("none");
  const ToggleModal = () => {
    if (modalActive == 'block') {
      setModalActive('none');
      document.body.style.overflow = 'auto'
    } else {
      setModalActive('block');
      document.body.style.overflow = 'hidden'
    }
  }
  const FetchRequiredData = () => {
    ServerAxios.get("/api/dashboard/product-related-data").then(res => {
      setBrands(res.data.all_brands);
      setProducts(res.data.products);
      setCategories(res.data.categories);
    });
  }

  const ref_brand_id         = useRef(null);
  const ref_category_id      = useRef(null);
  const ref_name             = useRef(null);
  const ref_yield            = useRef(null);
  const ref_color            = useRef(null);
  const ref_stocks_available = useRef(null);
  const ref_part_number      = useRef(null);
  const ref_item_number      = useRef(null);
  const ref_item_description = useRef(null);
  const ref_compatible_with  = useRef(null);
  const ref_suppliers_price  = useRef(null);
  const ref_our_price        = useRef(null);
  const ref_thumbnail        = useRef(null);

  const SubmitProduct = (event) => {
    event.preventDefault();
    const form = new FormData;

    form.append("brand_id",        ref_brand_id.current.value);
    form.append("category_id",     ref_category_id.current.value);
    form.append("name",            ref_name.current.value);
    form.append("yield",           ref_yield.current.value);
    form.append("color",           ref_color.current.value);
    form.append("stocks_available",ref_stocks_available.current.value);
    form.append("part_number",     ref_part_number.current.value);
    form.append("item_number",     ref_item_number.current.value);
    form.append("item_description",ref_item_description.current.value);
    form.append("compatible_with", ref_compatible_with.current.value);
    form.append("suppliers_price", ref_suppliers_price.current.value);
    form.append("our_price",       ref_our_price.current.value);
    form.append("thumbnail",       ref_thumbnail.current.value);

    ServerAxios.post("/api/dashboard/store-product", form, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res.data);
    });

  }





  useEffect(() => {
    FetchRequiredData();
  },[]);

  return (
    <div>
      <div className={'flex-between'}>
        <h3>Manage All Products</h3>
        <button onClick={ToggleModal} className={'btn btn-success'}>New Product</button>
      </div>
      <br/>

      <table className={'table table-striped'} style={{border:'1px solid #d1d1d1'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Stocks</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>MANAGE</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product,key) => (
            <tr key={key}>
              <td>{product.id}</td>
              <td>{product.stocks_available}</td>
              <td>{product.name}</td>
              <td>${product.our_price}</td>
              <td>
                <button className={'btn btn-primary'}>Edit</button>&nbsp;
                <button className={'btn btn-danger'}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Structure */}
      <div className={"modal th-modal show fade"} role={"dialog"} style={{display: modalActive}}>
        <div className={"modal-dialog"}>
          <div className={"modal-content"}>
            <div className={"modal-header"}>
              <h4 className={"modal-title"}>Add new Product</h4>
            </div>
            <div className={"modal-body"}>
              <div className={'form-body'}>
                <div className="row">
                  <div className="col-md-6">
                    <div className={'form-group'}>
                      <label>Brand</label>
                      <select ref={ref_brand_id} className="form-control">
                        <option value="">--Select--</option>
                        {brands.map((brands,key) => (
                          <option value={brands.name} key={key}>{brands.brand_name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={'form-group'}>
                      <label>Category</label>
                      <select ref={ref_category_id} className="form-control">
                        {categories.map((category,key) => (
                          <option value={category.name} key={key}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className={'form-group'}>
                      <label>Product Name / Model</label>
                      <input ref={ref_name} type="text" className={'form-control'}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={'form-group'}>
                      <label>Yield (If Toner)</label>
                      <input ref={ref_yield} type="text" className={'form-control'}/>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className={'form-group'}>
                      <label>Color</label>
                      <select ref={ref_color} className="form-control">
                        <option value="">--Select--</option>
                        <option value="Cyan">Cyan</option>
                        <option value="Magenta">Magenta</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Black">Black</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={'form-group'}>
                      <label>Stocks Available</label>
                      <input ref={ref_stocks_available} type="number" className={'form-control'}/>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className={'form-group'}>
                      <label>Part Number</label>
                      <input ref={ref_part_number} type="text" className={'form-control'}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={'form-group'}>
                      <label>Item Number (SKU)</label>
                      <input ref={ref_item_number} type="text" className={'form-control'}/>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className={'form-group'}>
                      <label>Suppliers Price</label>
                      <input ref={ref_suppliers_price} type="number" className={'form-control'}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={'form-group'}>
                      <label>Our Price</label>
                      <input ref={ref_our_price} type="number" className={'form-control'}/>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className={'form-group'}>
                      <label>Thumbnail</label>
                      <input ref={ref_thumbnail} type="file" className={'form-control'}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={'form-group'}>
                      <label>Compatible With</label>
                      <input ref={ref_compatible_with} type="text" className={'form-control'}/>
                    </div>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label>Description</label>
                  <textarea ref={ref_item_description} rows="3" className="form-control"></textarea>
                </div>
              </div>
            </div>
            <div className={"modal-footer"}>
              <div className={'text-right'}>
                <button onClick={ToggleModal} type={"button"} className={"btn btn-warning"} data-dismiss={"modal"}>Close</button>
                &nbsp; &nbsp;
                <button onClick={SubmitProduct} className="btn btn-primary" type={"submit"}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}