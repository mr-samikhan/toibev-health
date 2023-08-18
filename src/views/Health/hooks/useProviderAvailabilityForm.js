import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addProvider, updateProvider } from "../actions";
import { useMutation, useQueryClient } from "react-query";

const myCustomLocale = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],

  weekDays: [
    {
      name: "Monday",
      short: "Mo",
    },
    {
      name: "Tuesday",
      short: "Tu",
    },
    {
      name: "Wednesday",
      short: "We",
    },
    {
      name: "Thursday",
      short: "Th",
    },
    {
      name: "Friday",
      short: "Fr",
    },
    {
      name: "Saturday",
      short: "Sa",
      isWeekend: true,
    },
    {
      name: "Sunday",
      short: "Su",
      isWeekend: true,
    },
  ],
  weekStartingIndex: 0,
  getToday(gregorainTodayObject) {
    return gregorainTodayObject;
  },
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day);
  },
  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate();
  },
  transformDigit(digit) {
    return digit;
  },
  nextMonth: "Next Month",
  previousMonth: "Previous Month",
  openMonthSelector: "Open Month Selector",
  openYearSelector: "Open Year Selector",
  closeMonthSelector: "Close Month Selector",
  closeYearSelector: "Close Year Selector",
  defaultPlaceholder: "Select...",
  from: "from",
  to: "to",
  digitSeparator: ",",
  yearLetterSkip: 0,
  isRtl: false,
};

const defaultAvailableTimes = [
  { label: "9:00am", value: "9:00am", isSelected: false },
  { label: "9:00am", value: "9:00", isSelected: false },
  { label: "10:00am", value: "10:00am", isSelected: false },
  { label: "9:00am", value: "9:00", isSelected: false },
  { label: "11:00am", value: "11:00am", isSelected: false },
  { label: "9:00am", value: "9:00", isSelected: false },
  { label: "12:00pm", value: "12:00pm", isSelected: false },
  { label: "9:00am", value: "9:00", isSelected: false },
  { label: "1:00pm", value: "1:00pm", isSelected: false },
];

export const useProviderAvailabilityForm = (props) => {
  const { isEdit, initialState, setOpen } = props;

  const { control, handleSubmit, reset } = useForm();
  const [selectedDays, setSelectedDays] = useState(
    initialState?.availabilities?.days?.map((day) => {
      return {
        year: Number(day.split("-")[0]),
        month: Number(day.split("-")[1]),
        day: Number(day.split("-")[2]),
      };
    }) ?? []
  );
  const queryClient = useQueryClient();
  const [availableTimes, setAvailableTimes] = useState(
    defaultAvailableTimes?.map((time) =>
      initialState?.availabilities?.hours?.includes(time.value)
        ? { ...time, isSelected: true }
        : time
    ) ?? defaultAvailableTimes
  );

  const { isLoading, mutate } = useMutation(updateProvider, {
    onSuccess: (success) => {
      setOpen(false);
      queryClient.invalidateQueries("get-all-providers");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleAvailableTime = (selectedTime) => {
    const times = availableTimes;
    const updatedTimes = times.map((time) =>
      selectedTime.value === time.value
        ? { ...selectedTime, isSelected: !selectedTime?.isSelected }
        : time
    );
    setAvailableTimes(updatedTimes);
  };

  const onSubmit = () => {
    const days = selectedDays.map(
      (day) => `${day.year}-${day.month}-${day.day}`
    );
    const hours = availableTimes
      .filter((time) => time.isSelected)
      .map((hour) => hour.label);

    const availabilities = [].concat(
      ...days.map((day) => {
        return hours.map((hour) => {
          return { day, hour };
        });
      })
    );

    mutate({ ...availabilities, id: initialState.id });
  };

  useEffect(() => {
    isEdit && reset({ ...initialState });
  }, isEdit);

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    selectedDays,
    setSelectedDays,
    myCustomLocale,
    availableTimes,
    handleAvailableTime,
    ...props,
  };
};
