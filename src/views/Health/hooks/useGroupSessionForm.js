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
    defaultValues: {
      ...initialState,
      time: !!initialState?.datetime?.seconds
        ? new Date(initialState?.datetime?.seconds * 1000)?.toLocaleTimeString()
        : "",
    },
  });
  const [date, setDate] = useState(getDate() ?? null);
  const queryClient = useQueryClient();

  function getDate() {
    if (!initialState?.datetime?.seconds) return "";
    const date = new Date(initialState?.datetime?.seconds * 1000)
      .toLocaleDateString()
      .split("/");

    const day = date[0];
    const month = date[1];
    const year = date[2];
    return { day, month, year };
  }

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
