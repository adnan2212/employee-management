import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);

import {
  FaAngleLeft,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
  FaRegCalendarAlt
} from "react-icons/fa";

const Calendar = ({ onDateSelect }) => {
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.on("slideChange", handleSlideChange);
    }
  }, []);

  const handleSlideChange = () => {
    const activeIndex = swiperRef.current.activeIndex;
    const diff = activeIndex - 3; // 3 is the center slide index
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + diff);
    setCurrentDate(newDate);
  };

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
    }, 2000);
  };

  const handleNextWeek = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);
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
    // Perform any additional logic or actions on date selection
    console.log("Selected Date:", date);
    onDateSelect(date);
    if (showFullCalendar) {
      handleToggleCalendar(); // Toggle the calendar visibility
    }
  };

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

    for (let i = -5; i < 6; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const isCurrentDay = day.toDateString() === today.toDateString();
      const isSelected =
        selectedDate && day.toDateString() === selectedDate.toDateString();
      const isDisabled = day > today; // Check if the date is after the current day

      const dayClassName = `cursor-pointer w-[65px] p-2 rounded bg-gray-100 ${
        isCurrentDay
          ? "bg-gradient-to-b from-blue-200 to-indigo-200 text-black font-semibold"
          : ""
      }  ${isSelected ? "bg-gray-400 text-white" : ""} ${
        isDisabled ? "text-gray-300 cursor-not-allowed" : ""
      }`;

      const dayContainerClassName = `flex justify-center w-1/7   text-center  ${
        daysFromStartOfWeek === i ? "" : ""
      }`;

      days.push(
        <SwiperSlide
          key={i}
          className={`${dayContainerClassName} ${
            isCurrentDay ? "swiper-slide-active" : ""
          }`}
        >
          <div
            className={`${dayClassName} rounded-2xl px-4 py-[15px]`}
            onClick={() => {
              if (isDisabled) return;
              handleDateClick(day);
            }}
          >
            <div className="text-xs ">
              {day.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div className="text-center">{day.getDate()}</div>
          </div>
        </SwiperSlide>
      );
    }

    return (
      <Swiper
        className=" px-5 sm:w-[50%]  "
        spaceBetween={10}
        slidesPerView={5}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        initialSlide={daysFromStartOfWeek + 5} // Centered slide index
      >
        {days}
      </Swiper>
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
      const dayClassName = `cursor-pointer py-3 px-1 rounded-2xl bg-gray-100 ${
        isCurrentDay
          ? "bg-gradient-to-b from-blue-200 to-indigo-200 text-black font-semibold"
          : ""
      } ${isSelected ? "bg-gray-400 text-white" : ""} ${
        isDisabled ? "text-gray-300 cursor-not-allowed" : ""
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
      <div className="flex-col  rounded-3xl p-5 shadow  md:mx-auto md:max-w-[420px]">
        <div className="mb-2 flex  items-center justify-between">
          <button
            className="rounded-lg from-blue-200 to-indigo-200 p-2 text-gray-800 hover:bg-gradient-to-b hover:text-stone-100"
            onClick={handlePreviousYear}
            title="Previous Year"
          >
            <FaAngleDoubleLeft />
          </button>
          <button
            className="rounded-lg from-blue-200 to-indigo-200 p-2 text-gray-800 hover:bg-gradient-to-b hover:text-stone-100"
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
            className="rounded-lg from-blue-200 to-indigo-200 p-2 text-gray-800 hover:bg-gradient-to-b hover:text-stone-100"
            onClick={handleNextMonth}
            title="Next Month"
          >
            <FaAngleRight />
          </button>
          <button
            className="rounded-lg from-blue-200 to-indigo-200 p-2 text-gray-800 hover:bg-gradient-to-b hover:text-stone-100"
            onClick={handleNextYear}
            title="Next Year"
          >
            <FaAngleDoubleRight />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 ">
          <div className="text-center text-xs text-gray-500 ">Mon</div>
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
    <section className=" mt-1 py-5 md:pt-10   md:text-center">
      <div className="mb-4">
        <button
          className="mb-5 pl-3 text-lg font-bold text-black md:text-center"
          onClick={handleToggleCalendar}
        >
          <Link to="/#" className="flex items-center justify-center gap-3 px-6">
            <p>Pick Date</p>
            <FaRegCalendarAlt />
          </Link>
        </button>
      </div>
      <div ref={calendarRef}>
        {showFullCalendar ? renderFullCalendar() : renderWeeklyCalendar()}
      </div>
    </section>
  );
};

export default Calendar;
