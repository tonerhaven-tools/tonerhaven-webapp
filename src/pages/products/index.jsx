import { Layout, Page } from "@/shared/components";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    FetchProducts();
  }, []);

  const FetchProducts = () => {
    const url = "/api/products/all-products";
    Axios.get(url).then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  };

  return (
    <Page title={"Toner Haven | All Products!"}>
      <Layout>
        <h1 className={"text-center"}>Products Page</h1>

        <div className="row">
          {products.map((product, key) => (
            <div className="col-md-3" key={key}>
              <div className="product">
                <img
                  className={"img-responsive"}
                  src={`/api/storage/uploads/products/${product.thumbnail}`}
                />
                <div className={"name"}>{product.name}</div>
                <div className={"price"}>${product.our_price}</div>
                <button className={"add-cart"}>🛒 Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </Page>
  );
};

export default Products;
