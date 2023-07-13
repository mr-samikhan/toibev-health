import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addAdmin, updateAdmin, sendResetPasswordEmail } from "../actions";

const radioOptions = [
  { value: "administrator", label: "Administrator" },
  { value: "moderator", label: "Moderator" },
];

export default function useAddAdmin({ isEdit, data, setOpen }) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: data?.email,
      permissionLevel: data?.permissionLevel?.value ?? "administrator",
      ...data,
    },
  });

  const { email } = watch();

  const { isLoading, mutate } = useMutation(isEdit ? updateAdmin : addAdmin, {
    onSuccess: (success) => {
      setOpen(false);
      queryClient.invalidateQueries("get-all-admins");
    },
    onError: (error) => {
      if (error === "auth/email-already-in-use") {
        setError("email", { message: "Email already in use" });
      }
    },
  });

  const { isLoading: isLoadingResetPassword, mutate: mutateResetPassword } =
    useMutation(sendResetPasswordEmail, {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-admins");
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const onSubmit = (data) => {
    const passwordsMatch = data.password === data.confirmPassword;
    if (!passwordsMatch) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }
    isEdit ? mutate({ ...data, id: data.id }) : mutate({ ...data });
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    radioOptions,
    isLoading,
    errors,
    isLoadingResetPassword,
    mutateResetPassword,
    email,
  };
}
