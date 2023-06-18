import { useState } from "react";

import ProjectContainer from "../components/ProjectContainer";
import HourSheet from "../Components/HourSheet";
import Calendars from "../components/Calenders";

const Dashboard = () => {
  const [dailyAllKPI, setDailyAllKPI] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null); // Add selectedDate state
  const handleDateSelect = (date) => {
    setSelectedDate(date); // Update selectedDate state when a date is selected
    console.log("Selected Date:", date);
  };
  console.log("Selected Date in FirstPage:", selectedDate);

  return (
    <>
      {/* <Header userName={"Rajesh Mehta"} /> */}
      <Calendars onDateSelect={handleDateSelect} />
      <ProjectContainer selectedDate={selectedDate} dailyAllKPI={dailyAllKPI} />

      <HourSheet selectedDate={selectedDate} setDailyAllKPI={setDailyAllKPI} />
    </>
  );
};

export default Dashboard;
