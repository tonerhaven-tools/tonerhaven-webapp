import { Layout, Page } from "@/shared/components";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ServerAxios, {server_url} from "../../shared/http/ServerAxios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    FetchProducts();
  }, []);

  const FetchProducts = () => {
    const url = `/api/products/all-products`;
    ServerAxios.get(url).then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  };

  const onImageError = (e, item) => {
    const img = document.getElementById(`product-img-${item.name}`);
    img.src = "/images/favicon.png";
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
                  id={`product-img-${product.name}`}
                  className={"img-responsive"}
                  src={`${server_url}/storage/uploads/products/${product.thumbnail}`}
                  onError={(e) => onImageError(e, product)}
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
