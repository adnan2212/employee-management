import { Icon } from "@ricons/utils";

const Box = ({ title, content, content2, iconSize, iconName }) => {
  return (
    <div className="m-3 flex h-28 w-40 scale-100 flex-col justify-between rounded-xl bg-[#EEF2FF] ">
      <h1 className="m-2 p-2 text-sm font-semibold text-black">{title}</h1>

      <div className="number-div flex flex-col items-end justify-between">
        {typeof content2 === "number" ? (
          <div className="right-5 top-2 flex p-4 pt-5 text-sm font-medium">
            <p className="pl-1 text-[#2051E5] underline ">{content} </p>
            <p className="px-1 ">/{content2}</p>
          </div>
        ) : (
          <p className="p-3 text-3xl font-bold">{content}</p>
        )}
      </div>
    </div>
  );
};

export default Box;
