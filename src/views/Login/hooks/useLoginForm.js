import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "../../../firebase";
import { useDispatch } from "react-redux";
import {
  resetAuthValues,
  setAuthValues,
} from "../../../redux/actions/loginActions";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils";

export default function useLoginForm({ isEdit, data }) {
  const { control, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((data) => {
        dispatch(setAuthValues(data));
        navigate("/dashboard");
        return data;
      })
      .catch((error) => {
        //Alert Error Message
        const err = getErrorMessage();
      });
  };

  useEffect(() => {
    isEdit && reset({ ...data });
  }, isEdit);

  return {
    control,
    handleSubmit,
    onSubmit,
  };
}
