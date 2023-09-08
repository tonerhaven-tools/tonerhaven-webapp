import { Layout, Page } from "@/shared/components";
import ServerAxios from "../../shared/http/ServerAxios";
import ProductCard from "../../shared/components/product/ProductCard";
import { useEffect, useState } from "react";

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
    if (!products || products.length <= 0)
      return (
        <div>
          Hello! Please hang tight while we load your data. It won't be long!
        </div>
      );
    return (
      <div className="row">
        {products?.map((product, key) => (
          <ProductCard key={key} product={product} />
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
