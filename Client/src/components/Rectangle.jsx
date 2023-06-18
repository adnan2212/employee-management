import PopUp from "./PopUp";
const Rectangle = () => {
  return (
    <div className="m-5 flex justify-center pb-10 ">
      <button className="flex h-16 w-80 scale-100 items-center justify-center  rounded-xl bg-gradient-to-r from-blue-800 to-indigo-900 px-8  font-extrabold   text-white">
        <span className="scale-125">
          <PopUp />
        </span>
      </button>
    </div>
  );
};

export default Rectangle;
