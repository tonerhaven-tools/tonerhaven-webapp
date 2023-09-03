import Logo from "./Logo";
export default function Footer () {
  const footerMenuItems = [
    {
      name: "My account",
      path: "/"
    },
    {
      name: "Shopping Cart",
      path: "/"
    },
    {
      name: "All Products",
      path: "/"
    },
    {
      name: "Checkout",
      path: "/"
    },
  ]




  return (

    <div className="footer" style={{ marginTop: '150px' }}>
      <div className="container footer-contents">
        <div className="row">
          <div className="col-md-4">
            <Logo/>
            <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
              Your trusted source for premium toners, printer parts, and top-notch service. <br /><br />
              We specialize in delivering high-quality products and exceptional customer support, ensuring your printing needs are met with utmost satisfaction. Experience excellence in every print.
            </p>
          </div>
          <div className="col-md-4">
            <div className="footer-title">Our Links</div>
            <hr />
            <ul>
              {footerMenuItems.map(menuItem => (
                <li className="nav-item" key={menuItem.name}>
                  <a className="nav-link" href={menuItem.path} tabIndex="-1"><b>{menuItem.name}</b></a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <div className="footer-title">Our Addresses</div>
            <hr/>
            <p>Corporate address: 40 SW 13th St suite #301, Miami, FL 33130</p>
            <p>Warehouse: 10655 NW 122nd Street Miami, FL 33178 Phone: 877-781-5112</p>
          </div>
        </div>
      </div>
      <div className="footer-rights text-center">
        Copyright &copy; 2023 Toner Haven LLC. All Rights Reserved.
      </div>
    </div>
  )
}