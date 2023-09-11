import { Page, SecuredLayout } from "@/shared/components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import DashOverview from "./components/overview";
import DashProducts from "./components/products";
import "../../styles/dashboard.scss";

const Root = () => {
  const { user } = useAuth0();
  const [activePage, setActivePage] = useState(2);

  useEffect(() => {
    console.log("user: ", user);
  }, []);

  return (
    <Page title={"Toner Haven | Your one stop shop for toners!"}>
      <SecuredLayout>
        <div className="row">
          <div className="col-md-3">
            <h3>Menu</h3>
            <br />

            <div className="sidebar">
              <ul>
                <li onClick={() => setActivePage(1)}>Overview</li>
                <li onClick={() => setActivePage(2)}>All Products</li>
                <li onClick={() => setActivePage(3)}>Orders</li>
                <li onClick={() => setActivePage(4)}>New Order</li>
                <li onClick={() => setActivePage(5)}>Inquiries</li>
              </ul>
            </div>
          </div>

          <div className="col-md-9">
            <div className={"content"}>
              {activePage == 1 && <DashOverview />}
              {activePage == 2 && <DashProducts />}
            </div>
          </div>
        </div>
      </SecuredLayout>
    </Page>
  );
};

export default Root;
