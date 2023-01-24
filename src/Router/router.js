import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import App from "../App";

const Learn = () => {
  return <div>Hello Learn</div>;
};
const Health = () => {
  return <div>Hello Health</div>;
};
const Event = () => {
  return <div>Hello Event</div>;
};
const Information = () => {
  return <div>Hello Information</div>;
};
const Assesment = () => {
  return <div>Hello Assesment</div>;
};
const Admins = () => {
  return <div>Hello Admin</div>;
};

export default function ErrorPage() {
  return <>Page Not Found</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "learn", element: <Learn /> },
      { path: "health", element: <Health /> },
      { path: "event", element: <Event /> },
      { path: "Information", element: <Information /> },
      { path: "assesment", element: <Assesment /> },
      { path: "admins", element: <Admins /> },
    ],
    errorElement: <ErrorPage />,
  },
  { path: "/login", element: <h1>Login</h1> },
]);
