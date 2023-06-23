import { useForm } from "react-hook-form";
import {
  confirmPasswordReset,
  auth,
  verifyPasswordResetCode,
} from "../../firebase";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export default function useResetPassword() {
  const { search } = useLocation();
  const { oobCode } = queryString.parse(search);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm();

  const newPassword = watch("password");

  const handleResetPassword = () => {
    confirmPasswordReset(auth, oobCode, newPassword)
      .then(() => {
        console.log("Password reset successful");
      })
      .catch((error) => {
        console.log("Error resetting password:", error);
      });
  };

  const onSubmit = (data) => {
    const passwordsMatch = data.password === data.confirmPassword;
    if (!passwordsMatch) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }
    handleResetPassword();
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
}
