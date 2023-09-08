import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

import "@/styles/toner-haven.scss";
import "nprogress/nprogress.css";

import { Auth0Provider } from "@auth0/auth0-react";

import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router";

const app = document.getElementById("root");

createRoot(app).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-wy7vwm5m.us.auth0.com"
      clientId="MXtUFTiWjH8XzZjwXoGTxbwvih84Ld1C"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Routes />
    </Auth0Provider>
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root")).render(

// );
