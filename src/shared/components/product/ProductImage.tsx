import React, { useEffect, useState } from "react";
import { SyntheticEvent } from "react";
import ContentLoader from "react-content-loader";
import { Product } from "types/global.d.ts";
import { server_url } from "@/shared/http/ServerAxios";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


interface ProductImageProps {
    product: Product;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
    const [isLoading, setLoading] = useState(true);

    const navigate = useNavigate();

    const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        const img = e.currentTarget;
        img.src = "/images/product.png";
    };


    const gotoProductDetails = () => {
        navigate(`/products/${product.id}`);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

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
                    backgroundColor="#d9d9d9"
                    foregroundColor="#ededed"
                >
                    <rect width="100%" height="100%" />
                </ContentLoader>
            </div>
        );

    return (
        <img style={{ cursor: "pointer" }}
            onClick={gotoProductDetails}
            id={`product-img-${product.name}`}
            className={"img-responsive"}
            src={`${server_url}/storage/uploads/products/${product.thumbnail}`}
            onError={(e) => onImageError(e)}
        />
    );
};

export default ProductImage;
