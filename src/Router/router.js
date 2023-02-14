import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import App from "../App";
import { Learn } from "../views/Learn";
import { CustomList } from "../components/List";
import { Admins } from "../views/Admins";
import { Assessment } from "../views/Assessment";
import { Health } from "../views/Health";
import { Events } from "../views/Events";

const Information = () => {
  return <div>Hello Information</div>;
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
      { path: "events", element: <Events /> },
      { path: "Information", element: <Information /> },
      { path: "assesment", element: <Assessment /> },
      { path: "admins", element: <Admins /> },
    ],
    errorElement: <ErrorPage />,
  },
  { path: "/login", element: <CustomList /> },
]);
