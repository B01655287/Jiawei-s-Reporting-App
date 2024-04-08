import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Routes from "./router/routes";
import { DotLoading } from "antd-mobile";
import "./App.css";

const lazyLoad = (children) => {
  return (
    <Suspense
      fallback={
        <div className="loadingbox">
          <DotLoading />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

const App = () => {
  let routes = [];
  Routes.forEach((route, index) => {
    const Ele = route.element;
    const router = {
      path: route.path,
      element: lazyLoad(<Ele />),
    };
    routes.push(router);
  });
  const router = useRoutes([...routes]);
  return <>{router}</>;
};

export default App;
