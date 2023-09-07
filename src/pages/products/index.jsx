import { Layout, Page } from "@/shared/components";
import ServerAxios from "../../shared/http/ServerAxios";
import ProductCard from "./components/ProductCard";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      ServerAxios.get("/api/products/all-products").then((resp) => {
        setProducts(resp.data);
        return Promise.resolve(resp);
      });

      setMounted(true);
    }
  }, []);

  const renderProducts = () => {
    if (!products || products.length <= 0) return <div>No Items</div>;
    return (
      <div className="row">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <Page title="Toner Haven | All Products!">
      <Layout header="Our Products">{renderProducts()}</Layout>
    </Page>
  );
}
