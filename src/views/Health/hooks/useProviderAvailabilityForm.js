import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addProvider, updateProvider } from "../actions";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";

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
  { label: "1:00am", value: "01:00am", isSelected: false },
  { label: "2:00am", value: "02:00am", isSelected: false },
  { label: "3:00am", value: "03:00am", isSelected: false },
  { label: "4:00am", value: "04:00am", isSelected: false },
  { label: "5:00am", value: "05:00am", isSelected: false },
  { label: "6:00am", value: "06:00am", isSelected: false },
  { label: "7:00am", value: "07:00am", isSelected: false },
  { label: "8:00am", value: "08:00am", isSelected: false },
  { label: "9:00am", value: "09:00am", isSelected: false },
  { label: "10:00am", value: "10:00am", isSelected: false },
  { label: "11:00am", value: "11:00am", isSelected: false },
  { label: "12:00pm", value: "12:00pm", isSelected: false },
  { label: "1:00pm", value: "01:00pm", isSelected: false },
  { label: "2:00pm", value: "02:00pm", isSelected: false },
  { label: "3:00pm", value: "03:00pm", isSelected: false },
  { label: "4:00pm", value: "04:00pm", isSelected: false },
  { label: "5:00pm", value: "05:00pm", isSelected: false },
  { label: "6:00pm", value: "06:00pm", isSelected: false },
  { label: "7:00pm", value: "07:00pm", isSelected: false },
  { label: "8:00pm", value: "08:00pm", isSelected: false },
  { label: "9:00pm", value: "09:00pm", isSelected: false },
  { label: "10:00pm", value: "10:00pm", isSelected: false },
  { label: "11:00pm", value: "11:00pm", isSelected: false },
  { label: "12:00am", value: "12:00am", isSelected: false },
];

export const useProviderAvailabilityForm = (props) => {
  const { isEdit, initialState, setOpen } = props;

  const { control, handleSubmit, reset } = useForm();
  const [selectedDays, setSelectedDays] = useState(
    initialState?.availabilities?.map(({ date }) => {
      return {
        year: Number(date.split("-")[0]),
        month: Number(date.split("-")[1]),
        day: Number(date.split("-")[2]),
      };
    }) ?? []
  );
  const queryClient = useQueryClient();
  const [availableTimes, setAvailableTimes] = useState(
    defaultAvailableTimes.map((timeSlot) => {
      const isSelected = initialState?.availabilities.some((selectedTime) => {
        return timeSlot.value === selectedTime.time;
      });

      return { ...timeSlot, isSelected };
    })
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
    const days = selectedDays.map((day) =>
      moment(`${day.year}-${day.month}-${day.day}`).format("YYYY-MM-DD")
    );

    const hours = availableTimes
      .filter((time) => time.isSelected)
      .map((hour) => hour.value);

    const availabilities = [].concat(
      ...days.map((date) => {
        return hours.map((time) => {
          return { date, time };
        });
      })
    );

    mutate({ availabilities, id: initialState.id });
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
