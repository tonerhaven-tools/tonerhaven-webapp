import { Layout, Page } from "@/shared/components";
import SecuredLayout from "@/shared/components/SecuredLayout";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Root = () => {
  return (
    <Page title={"Toner Haven | Your one stop shop for toners!"}>
      <Layout>
        <div className="row">
          <div className="col-md-5">
            <div className="middle-center mt-5">
              <div className="mt-5">
                <div style={{ fontSize: "40px" }}>
                  OEM and Compatible <br />
                  <span className="text-blue">Toners</span> and{" "}
                  <span className="text-blue">Parts</span>
                </div>
                <h5 className="mt-3">
                  We sell toners, parts, and supplies for printers at a very
                  affordable price. Lowest in the market!{" "}
                </h5>
              </div>
            </div>
            <div className="mt-3">
              <Link
                style={{ width: "200px", marginBottom: "5px" }}
                className="call-to-action btn btn-primary"
                to={"/products"}
              >
                Products
              </Link>
              &nbsp;&nbsp;
              <Link
                style={{ width: "200px", marginBottom: "5px" }}
                className="call-to-action btn"
                to={"/categories"}
              >
                Categories
              </Link>
            </div>
          </div>
          <div className="col-md-7">
            <div className="middle-center mt-5" style={{ height: "400px" }}>
              <img
                style={{ maxWidth: "500px" }}
                src="/images/svgs/Creativity-bro.svg"
                className="img-responsive"
              />
            </div>
          </div>
        </div>
      </Layout>
    </Page>
  );
};

export default Root;
