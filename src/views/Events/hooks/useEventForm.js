import React, { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addEvent, updateEvent, deleteEvent } from "../actions";

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

export default function useEventForm({ initialState, setOpen, isEdit }) {
  const queryClient = useQueryClient();
  const [selectedVideo, setSelectedVideo] = useState({
    fileUrl: initialState?.video || "",
  });
  const [selectedImage, setSelectedImage] = useState({
    fileUrl: initialState?.image || "",
  });
  const [selectedPdf, setSelectedPdf] = useState({
    ...(initialState?.pdf || {}),
  });
  const [isRecurring, setIsRecurring] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...initialState } });

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
    const body = {
      title: data.title,
      description: data.description,
      webLink: data.webLink,
      location: data.location,
      date: data.date,
      time: data.time,
      image: selectedImage,
      video: selectedVideo,
      pdf: selectedPdf,
      isRecurring,
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
  };
}
