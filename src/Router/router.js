import { Routes, Route } from "react-router-dom";
import { Learn } from "../views/Learn";
import { Admins } from "../views/Admins";
import { Assessment } from "../views/Assessment";
import { Health } from "../views/Health";
import { Events } from "../views/Events";
import ProtectedRoutes from "../HOC/ProtectedRoutes";
import { Information } from "../views/Information";
import Layout from "../Layout";
import Settings from "../views/Setttings";

export function Router() {
  return (
    <>
      <Routes>
        {/* <Route path="/login" exact element={<Login />}></Route> */}
      </Routes>
      <ProtectedRoutes>
        <Routes>
          <Route path="/" exact element={<Layout />}>
            <Route path="/dashboard" exact element={<></>} />
            <Route path="/learn" exact element={<Learn />} />
            <Route path="/health" exact element={<Health />} />
            <Route path="/events" exact element={<Events />} />
            <Route path="/information" exact element={<Information />} />
            <Route path="/assesment" exact element={<Assessment />} />
            <Route path="/admins" exact element={<Admins />} />
            <Route path="/account-settings" exact element={<Settings />} />
          </Route>
        </Routes>{" "}
      </ProtectedRoutes>
    </>
  );
}
