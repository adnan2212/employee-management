import DatePicker from "react-horizontal-datepicker";

const Date = () => {
  const selectedDay = (val) => {
    console.log(val);
  };
  return (
    <>
      <h1 className="ml-4 pt-4 text-lg font-bold text-[#0D1829]">Pick date</h1>
      <div className="m-5">
        <DatePicker
          getSelectedDay={selectedDay}
          endDate={5}
          selectDate={selectedDay}
          labelFormat={"MMMM"}
          color={"#2051E5"}
        />
      </div>
    </>
  );
};

export default Date;
