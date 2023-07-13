import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { auth, signInWithEmailAndPassword } from "../../../firebase";
import { useDispatch } from "react-redux";
import { setAuthValues } from "../../../redux/actions/loginActions";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils";

export default function useLoginForm({ isEdit, data }) {
  const { control, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((data) => {
        dispatch(setAuthValues(data));
        navigate("/dashboard");
        setIsLoading(false);
        return data;
      })
      .catch((error) => {
        //Alert Error Message
        const err = getErrorMessage(error);
      });
  };

  useEffect(() => {
    isEdit && reset({ ...data });
  }, isEdit);

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
  };
}
