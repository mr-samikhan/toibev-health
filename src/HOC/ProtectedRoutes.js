import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const { userToken, isAuthenticated } =
    useSelector((state) => state?.Auth) ?? {};
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (userToken && isAuthenticated) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
    // eslint-disable-next-line
  }, [location, isAuthenticated, userToken]);

  useEffect(() => {
    if (!userToken || !isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return (userToken && isAuthenticated) || true ? <>{children}</> : <></>;
};

export default ProtectedRoutes;
