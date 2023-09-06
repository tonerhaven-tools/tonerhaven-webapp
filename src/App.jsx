import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NProgress from "nprogress";
import AccountChecks from "./shared/components/AccountChecks";

const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });

//make the routes file based
const routes = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.jsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

const App = () => {
  return (
    <AccountChecks>
      <RouterProvider router={router} />
    </AccountChecks>
  );
};

export default App;
