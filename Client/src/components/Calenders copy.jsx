import { useState, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import {
  FaAngleLeft,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
  FaRegCalendarAlt
} from "react-icons/fa";

const Calendar = () => {
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggleCalendar = () => {
    setShowFullCalendar(!showFullCalendar);
  };

  const handlePreviousWeek = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(previousWeek);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handleNextWeek = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentDate);
    previousMonth.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const handleDateClick = (date) => {
    const today = new Date();
    if (date > today) {
      return; // Return early if the clicked date is after the current day
    }

    setSelectedDate(date);
    handleEfficiency(); // Fetch data for the selected date
    console.log("Selected Date:", date);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNextWeek(),
    onSwipedRight: () => handlePreviousWeek(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const renderWeeklyCalendar = () => {
    const today = new Date();
    const days = [];

    const startOfWeek = new Date(currentDate);
    const dayOfWeek = startOfWeek.getDay();
    const diff = (dayOfWeek === 0 ? 7 : dayOfWeek) - 1; // Calculate the difference between the start of the week and Monday
    startOfWeek.setDate(startOfWeek.getDate() - diff); // Get the starting date of the current week

    // Calculate the number of days between the start of the week and the current date
    const daysFromStartOfWeek = Math.floor(
      (today - startOfWeek) / (1000 * 60 * 60 * 24)
    );

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const isCurrentDay = day.toDateString() === today.toDateString();
      const isSelected =
        selectedDate && day.toDateString() === selectedDate.toDateString();
      const isDisabled = day > today; // Check if the date is after the current day

      const dayClassName = `cursor-pointer p-2 rounded bg-red-100 ${
        isCurrentDay ? "bg-red-600 text-white" : ""
      }  ${isSelected ? "bg-red-500 text-white" : ""} ${
        isDisabled ? "text-gray-400 cursor-not-allowed" : ""
      }`;

      const dayContainerClassName = `flex-shrink-0 flex-grow-0 w-1/7 text-center ${
        daysFromStartOfWeek === i ? "" : ""
      }`;

      days.push(
        <div
          key={i}
          className={`${dayContainerClassName}`}
          onClick={() => {
            if (isDisabled) return; // Return early if the date is disabled
            handleDateClick(day);
          }}
        >
          <div className={`${dayClassName} rounded-2xl px-4 py-[15px]`}>
            <div className="text-xs">
              {day.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div className="text-center">{day.getDate()}</div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`flex justify-center gap-2 overflow-x-auto transition-all ${
          isTransitioning ? "pointer-events-none" : ""
        }`}
        {...swipeHandlers}
      >
        {days}
      </div>
    );
  };

  const renderFullCalendar = () => {
    const today = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const diff = (startingDayOfWeek === 0 ? 7 : startingDayOfWeek) - 1; // Calculate the difference between the start of the month and Monday

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weeks = [];
    let week = [];

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < diff; i++) {
      week.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      const isCurrentDay = day.toDateString() === today.toDateString();
      const isSelected =
        selectedDate && day.toDateString() === selectedDate.toDateString();
      const isDisabled = day > today; // Check if the date is after the current day
      const dayClassName = `cursor-pointer py-2 rounded ${
        isCurrentDay ? "bg-[red]" : ""
      } ${isSelected ? "bg-[#ff553c] text-white" : ""} ${
        isDisabled ? "text-gray-400 cursor-not-allowed" : ""
      }`;

      week.push(
        <div
          key={i}
          className={dayClassName}
          onClick={() => handleDateClick(day)}
        >
          <div className=" text-center">{i}</div>
        </div>
      );

      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      // Add empty cells for the days after the last day of the month
      for (let i = week.length; i < 7; i++) {
        week.push(null);
      }
      weeks.push(week);
    }

    const handlePreviousYear = () => {
      const previousYear = new Date(currentDate);
      previousYear.setFullYear(currentDate.getFullYear() - 1);
      setCurrentDate(previousYear);
    };

    const handleNextYear = () => {
      const nextYear = new Date(currentDate);
      nextYear.setFullYear(currentDate.getFullYear() + 1);
      setCurrentDate(nextYear);
    };

    return (
      <div className="flex-col  rounded p-1 shadow  md:mx-auto md:max-w-[420px]">
        <div className="mb-2 flex  items-center justify-between">
          <button
            className="rounded p-2 text-gray-800 hover:bg-[red]"
            onClick={handlePreviousYear}
            title="Previous Year"
          >
            <FaAngleDoubleLeft />
          </button>
          <button
            className="rounded p-2 text-gray-800 hover:bg-[red]"
            onClick={handlePreviousMonth}
            title="Previous Month"
          >
            <FaAngleLeft />
          </button>
          <div className="flex items-center gap-2 text-lg font-bold">
            <FaRegCalendarAlt className="mr-1 inline" />
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric"
            })}
          </div>
          <button
            className="rounded p-2 text-gray-800 hover:bg-[red]"
            onClick={handleNextMonth}
            title="Next Month"
          >
            <FaAngleRight />
          </button>
          <button
            className="rounded p-2 text-gray-800 hover:bg-[red]"
            onClick={handleNextYear}
            title="Next Year"
          >
            <FaAngleDoubleRight />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          <div className="text-center text-xs text-gray-500">Mon</div>
          <div className="text-center text-xs text-gray-500">Tue</div>
          <div className="text-center text-xs text-gray-500">Wed</div>
          <div className="text-center text-xs text-gray-500">Thu</div>
          <div className="text-center text-xs text-gray-500">Fri</div>
          <div className="text-center text-xs text-gray-500">Sat</div>
          <div className="text-center text-xs text-gray-500">Sun</div>
          {weeks.flat().map((date, index) => (
            <div key={index} className="text-center ">
              {date}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mb-[-2rem] p-10 md:text-center">
      <div className="mb-4">
        <button
          className=" pick-btn mb-5 bg-[#bd243f]"
          onClick={handleToggleCalendar}
        >
          <div className="flex items-center gap-2">
            <p className="">Pick Date</p>
            <FaRegCalendarAlt />
          </div>
        </button>
      </div>
      <div ref={calendarRef}>
        {showFullCalendar ? renderFullCalendar() : renderWeeklyCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
