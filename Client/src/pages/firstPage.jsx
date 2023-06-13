import { useState, useEffect } from "react";

import Logo from "../components/Logo";
import Header from "../Components/header";
import Footer from "../components/Footer";
import ProjectContainer from "../components/ProjectContainer";
import HourSheet from "../Components/HourSheet";
import Calendars from "../components/Calenders";

const FirstPage = () => {
  const percentage = 90;
  const percentage2 = 66;
  const sum = percentage + percentage2 / 200;
  const [dailyAllKPI, setDailyAllKPI] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null); // Add selectedDate state
  const handleDateSelect = (date) => {
    setSelectedDate(date); // Update selectedDate state when a date is selected
    console.log("Selected Date:", date);
  };
  console.log("Selected Date in FirstPage:", selectedDate);

  return (
    <>
      <Logo />
      <Header userName={"Rajesh Mehta"} />
      <Calendars onDateSelect={handleDateSelect} />
      <ProjectContainer selectedDate={selectedDate} dailyAllKPI={dailyAllKPI} />

      <HourSheet selectedDate={selectedDate} setDailyAllKPI={setDailyAllKPI} />
      <Footer />
    </>
  );
};

export default FirstPage;
