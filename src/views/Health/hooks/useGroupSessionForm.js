import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  addGroupSession,
  deleteGroupSession,
  updateGroupSession,
} from "../actions";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import { Timestamp } from "../../../firebase";

export default function useGroupSessionForm({
  isEdit,
  data,
  setOpen,
  initialState,
}) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { ...initialState },
  });
  const [date, setDate] = useState(null);
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    isEdit ? updateGroupSession : addGroupSession,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-group-sessions");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteGroupSession,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-group-sessions");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onSubmit = (data) => {
    const dateString = moment(`${date.year}-${date.month}-${date.day}`).format(
      "YYYY-MM-DD"
    );
    const dateTimeString = `${dateString} ${data.time}`;
    const dateTime = moment(dateTimeString).format("YYYY-MM-DD HH:mm:ss");
    const isoDate = moment(dateTime).toISOString();

    const body = {
      title: data?.title,
      location: data?.location,
      description: data?.description,
      datetime: Timestamp.fromDate(new Date(isoDate)),
    };
    isEdit ? mutate({ ...body, id: initialState.id }) : mutate(body);
  };

  const onDelete = () => {
    mutateDelete(initialState?.id);
  };

  useEffect(() => {
    isEdit && reset({ ...data });
  }, isEdit);

  return {
    control,
    handleSubmit,
    onSubmit,
    isEdit,
    isLoading,
    onDelete,
    isLoadingDelete,
    date,
    setDate,
  };
}
