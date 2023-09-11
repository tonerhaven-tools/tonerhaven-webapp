import Layout from "@/shared/components/Layout";
import Page from "@/shared/components/Page";
import {
  Button,
  Carousel,
  CloseButton,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import {
  Arrow90degLeft,
  ArrowUpRight,
  CartPlus,
  ChevronLeft,
  Heart,
} from "react-bootstrap-icons";
import { useParams, Link } from "react-router-dom";

import { useState, useEffect } from "react";

import { fromFetch } from "rxjs/fetch";
import { switchMap, catchError, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Product } from "types/global.d.ts";
import { server_url } from "@/shared/http/ServerAxios";
import useCart from "@/shared/hooks/store/useCheckout";
import toast from "react-hot-toast";
import useAudio from "@/shared/hooks/useAudio";

interface ProductDetailProps { }

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { id } = useParams();

  const unlisted = [
    "brand_id",
    "category_id",
    "updated_at",
    "created_at",
    "thumbnail",
    "suppliers_price",
  ];

  const valueLabels = [
    {
      key: "id",
      value: "#",
    },
    {
      key: "name",
      value: "Product Name",
    },
    {
      key: "yield",
      value: "Yield",
    },
    {
      key: "color",
      value: "Color",
    },
    {
      key: "stocks_available",
      value: "Available",
    },
    {
      key: "part_number",
      value: "Part #",
    },
    {
      key: "item_number",
      value: "Item #",
    },

    {
      key: "item_description",
      value: "Description",
    },
    {
      key: "compatible_with",
      value: "Fits with models:",
    },
    {
      key: "our_price",
      value: "Price",
    },
  ];

  const onListed = (item: string) => !unlisted.some((name) => name == item);
  const getValueLabels = (item: string) =>
    valueLabels.find((name) => name.key == item)?.value;

  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState(null);

  const unsubscribe$ = new Subject();

  const { onCart, addCart } = useCart();
  const { toggle: playSuccess } = useAudio("/success.m4a");
  const { toggle: playFailed } = useAudio("/failed.m4a");

  const handleAdd = () => {
    if (!product) return;

    const responses = {
      loading: "Adding to cart, please wait...",
      success: `Item ${product.name} added`,
      error: "Something went wrong.",
    };

    if (!onCart.some((item) => item.id == product.id)) {
      playSuccess();
      toast.promise(Promise.resolve(addCart(product)), responses);
    } else {
      playFailed();
      toast.error(`${product.name} already exists in the cart.`);
    }
  };

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

  const renderAssets = () => {
    if (!product) return <div>Loading Images</div>;

    return (
      <Carousel>
        <Carousel.Item>
          <img className="w-75" src="/images/product.png" />
        </Carousel.Item>
      </Carousel>
    );
  };

  const renderContents = () => {
    if (!product) return <div>Loading Products</div>;

    return (
      <>
        <Table size="sm" striped>
          <tbody>
            {Object.keys(product as Product)
              .filter((item) => onListed(item))
              .map((field) => {
                return (
                  <tr key={field}>
                    <td>
                      <strong>{getValueLabels(field)}</strong>
                    </td>
                    <td>
                      <small>{product[field as keyof Product] ?? ""}</small>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <div className="d-flex flex-between">
          <Button onClick={handleAdd} className="m-1">
            <CartPlus /> Add to cart
          </Button>
          <Button variant="outline-dark" className="m-1">
            <Heart /> Save to wishlist
          </Button>
        </div>
      </>
    );
  };

  return (
    <Page title={`Toner Haven | Product Information : ${product?.name}`}>
      <Layout header={`Product information - ${product?.name}`}>
        <Container>
          <Row>
            <Col>{renderAssets()}</Col>
            <Col xl={6} xs={12}>
              {renderContents()}
            </Col>
          </Row>
        </Container>
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
