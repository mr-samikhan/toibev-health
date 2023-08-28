import React, { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addEvent, updateEvent, deleteEvent } from "../actions";
import moment from "moment";
import { Timestamp } from "../../../firebase";

const recurrenceOptions = [
  { label: "Hourly", value: "hourly" },
  { label: "Daily", value: "daily" },
  { label: "Weekdays", value: "weekdays" },
  { label: "Weekends", value: "weekends" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Every 3 Months", value: "every_3_months" },
  { label: "Every 6 Months", value: "every_6_months" },
  { label: "Yearly", value: "yearly" },
  { label: "Custom", value: "custom" },
];

const weekdays = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

export default function useEventForm({ initialState, setOpen, isEdit }) {
  const queryClient = useQueryClient();
  const [selectedVideo, setSelectedVideo] = useState({
    fileUrl: initialState?.video || "",
  });
  const [date, setDate] = useState(getDate() ?? null);
  const [selectedImage, setSelectedImage] = useState({
    fileUrl: initialState?.image || "",
  });
  const [selectedPdf, setSelectedPdf] = useState({
    ...(initialState?.pdf || {}),
  });
  const [isRecurring, setIsRecurring] = useState(false);

  function getDate() {
    if (!initialState?.datetime?.seconds) return "";
    const date = new Date(initialState.datetime.seconds * 1000)
      .toLocaleDateString()
      .split("/");

    const day = date[0];
    const month = date[1];
    const year = date[2];
    return { day, month, year };
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...initialState,
      time: !!initialState?.datetime?.seconds
        ? new Date(initialState?.datetime?.seconds * 1000)?.toLocaleTimeString()
        : "",
    },
  });

  const { isLoading, mutate } = useMutation(isEdit ? updateEvent : addEvent, {
    onSuccess: (success) => {
      setOpen(false);
      queryClient.invalidateQueries("get-all-events");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
    deleteEvent,
    {
      onSuccess: (success) => {
        setOpen(false);
        queryClient.invalidateQueries("get-all-events");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onSubmit = (data) => {
    console.log(data);
    const dateString = moment(`${date.year}-${date.month}-${date.day}`).format(
      "YYYY-MM-DD"
    );
    const dateTimeString = `${dateString} ${data.time}`;
    const dateTime = moment(dateTimeString).format("YYYY-MM-DD HH:mm:ss");
    const isoDate = moment(dateTime).toISOString();

    const body = {
      title: data.title,
      description: data.description,
      webLink: data.webLink,
      location: data.location,
      image: selectedImage,
      video: selectedVideo,
      pdf: selectedPdf,
      isRecurring,
      datetime: Timestamp.fromDate(new Date(isoDate)),
    };

    mutate(isEdit ? { ...body, id: initialState?.id } : body);
  };

  return {
    errors,
    control,
    handleSubmit,
    onSubmit,
    recurrenceOptions,
    setSelectedImage,
    setSelectedVideo,
    selectedImage,
    selectedVideo,
    selectedPdf,
    setSelectedPdf,
    setIsRecurring,
    isRecurring,
    isLoading,
    mutateDelete,
    isLoadingDelete,
    date,
    setDate,
    weekdays,
  };
}
