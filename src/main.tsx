/* eslint-disable react-refresh/only-export-components */
import React, { ComponentType, Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { Route } from "wouter";

import "@/styles/global.css";
import { AuthProvider } from "./hooks/use-auth";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Container from "./components/Container";

const Loadable =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) =>
    (
      <Suspense
        fallback={
          <div className="grid grid-rows-[auto_1fr_auto] h-screen">
            <Nav />
            <Container>Loading...</Container>
            <Footer />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );

// * Pages
const Home = Loadable(lazy(() => import("@/pages/index")));
const Login = Loadable(lazy(() => import("@/pages/login")));
const Session = Loadable(lazy(() => import("@/pages/session")));
const EventsNew = Loadable(lazy(() => import("@/pages/events/new")));
const Event = Loadable(lazy(() => import("@/pages/event/[eventId]")));

const Router = () => {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/session" component={Session} />
      <Route path="/events/new" component={EventsNew} />
      <Route path="/event/:eventId" component={Event} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
