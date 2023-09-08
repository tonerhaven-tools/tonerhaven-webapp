import { useParams } from "react-router-dom";

interface ProductDetailProps {}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { id } = useParams();
  return <div>Test {id}</div>;
};

export default ProductDetail;
