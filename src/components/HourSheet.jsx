const HourSheet = () => {
  return (
    <div className="mb-8 mt-8 shrink-0  rounded-3xl md:mb-[-3rem] md:mt-0">
      <p className=" ml-4 pt-4 text-lg font-bold text-[#0D1829] md:text-center ">
        Hour-Sheet
      </p>
      <div className="m-5 flex justify-center md:mt-5">
        <div className=" flex h-16 w-80 scale-100 items-center justify-around bg-[#2051E5] text-lg font-semibold text-white  shadow-lg  hover:scale-110  hover:shadow-2xl">
          <p
            className="leading-[3rem] 
"
          >
            Production
          </p>
          <p>5 hrs</p>
        </div>
      </div>
      <div className="m-5 flex justify-center md:mt-6">
        <div className=" flex h-16 w-80 scale-100 items-center justify-around bg-[#F77307] text-lg font-semibold text-white shadow-lg hover:scale-110 hover:shadow-2xl    md:mb-12">
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
