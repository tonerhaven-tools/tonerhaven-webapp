import Layout from "@/shared/components/Layout";
import Page from "@/shared/components/Page";
import { Button, CloseButton } from "react-bootstrap";
import {
  Arrow90degLeft,
  ArrowUpRight,
  ChevronLeft,
} from "react-bootstrap-icons";
import { useParams, Link } from "react-router-dom";

import { useState, useEffect } from "react";

import { fromFetch } from "rxjs/fetch";
import { switchMap, catchError, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Product } from "types/global.d.ts";
import { server_url } from "@/shared/http/ServerAxios";

interface ProductDetailProps { }

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState(null);

  const unsubscribe$ = new Subject();

  useEffect(() => {
    const fetchData = () => {
      fromFetch(`${server_url}/api/products/${id}`)
        .pipe(
          switchMap((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Network response was not ok");
            }
          }),
          catchError((err) => {
            setError(err.message);
            return [];
          }),
          takeUntil(unsubscribe$)
        )
        .subscribe((result) => {
          setProduct(result);
        });
    };

    fetchData();

    return () => {
      // Complete the subject to clean up resources
      unsubscribe$.complete();
    };
  }, []);

  return (
    <Page title="Toner Haven | Product Information">
      <Layout header="Product Information">
        <div>
          <div>{product?.name}</div>
          <div>{product?.item_description}</div>
          <div>{product?.part_number}</div>
          <div>{product?.our_price}</div>
          <div>{product?.item_number}</div>
          <div>{product?.color}</div>
        </div>

        <div className="mt-5">
          <Link to={"/products"}>
            <Button
              className="p-2"
              variant="light"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <ChevronLeft className="m-1" />
              <span className="m-1">Continue Shopping</span>
            </Button>
          </Link>
        </div>
      </Layout>
    </Page>
  );
};

export default ProductDetail;
