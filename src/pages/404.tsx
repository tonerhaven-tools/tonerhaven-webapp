import Appbar from "@/shared/components/Appbar";
import Footer from "@/shared/components/Footer";
import DefaultPage from "@/shared/components/default_pages/DefaultPage";
import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <>
      <Appbar />
      <Container className={"mt-3"}>
        <DefaultPage statusCode={404} />
      </Container>
      <Footer />
    </>
  );
};

export default NotFound;
