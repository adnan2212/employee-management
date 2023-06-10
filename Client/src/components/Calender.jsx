import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

const Calender = () => {
  const defaultValue = {
    year: 2023,
    month: 5,
    day: 24,
  };

  const [selectedDay, setSelectedDay] = useState(defaultValue);
  return (
    <DatePicker
      value={selectedDay}
      onChange={setSelectedDay}
      inputPlaceholder="Select a day"
      shouldHighlightWeekends
    />
  );
};

export default Calender;
