import { server_url } from "@/shared/http/ServerAxios";
import { SyntheticEvent } from "react";
import { Product } from "types/global.d.ts";
import { motion, useAnimation } from "framer-motion";

import { useState, useEffect } from "react";

import ContentLoader from "react-content-loader";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

interface ProductCardProps {
    key: React.Key;
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, key }) => {
    const [isLoading, setLoading] = useState(true);

    const [isZoomed, setIsZoomed] = useState(false);
    const controls = useAnimation();

    const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        const img = e.currentTarget;
        img.src = "/images/product.png";
    };


    const imagePreloader = (product: Product) => {
        if (isLoading)
            return (
                <div className="m-3 ">
                    <ContentLoader
                        style={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }}
                        speed={1}
                        width={"100%"}
                        height={"100%"}
                        viewBox="0 0 100% 100%"
                        backgroundColor="#d9d9d9"
                        foregroundColor="#ededed"
                    >
                        <rect width="100%" height="100%" />
                    </ContentLoader>
                </div>
            );

        return (
            <Card.Img
                variant="top"
                id={`product-img-${product.name}`}
                className={"img-responsive"}
                src={`${server_url}/storage/uploads/products/${product.thumbnail}`}
                onError={(e) => onImageError(e)}
            />
        );
    };

    useEffect(() => {
        return () => {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };
    }, []);

    return (
        <motion.div
            className="col-md-3"
            key={key}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
            <Card className="product border-0 bg-light">
                {imagePreloader(product)}
                <Card.Body>
                    <Card.Title className={"name"}>{product.name}</Card.Title>
                    <Card.Subtitle className={"price"}>
                        ${product.our_price}
                    </Card.Subtitle>
                </Card.Body>
                <Card.Footer className="border-0">
                    <button className={"add-cart"}>🛒 Add to cart</button>
                </Card.Footer>
            </Card>
        </motion.div>
    );
};

export default ProductCard;
