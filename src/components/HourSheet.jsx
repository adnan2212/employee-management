// import Rectangle from "../assets/img/Rectangle.svg";
// import RectangleOrange from "../assets/img/Rectangle.svg";
const HourSheet = () => {
  return (
    <div>
      <p className="ml-4 flex justify-center pt-4 text-lg font-bold text-[#0D1829]">
        Hour-Sheet
      </p>
      <div className="m-5 flex justify-center">
        <div className=" flex h-16 w-80 items-center justify-around bg-[#2051E5]  text-lg  font-semibold  text-white">
          <p
            className="leading-[3rem] 
"
          >
            Production
          </p>
          <p>5 hrs</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" mb-10 flex h-16 w-80 items-center justify-around bg-[#F77307] text-lg font-semibold    text-white">
          <p
            className="leading-[3rem]  
"
          >
            Non-production
          </p>
          <p>3 hrs</p>
        </div>
      </div>
    </div>
  );
};

export default HourSheet;
