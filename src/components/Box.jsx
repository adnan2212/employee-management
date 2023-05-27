import { Icon } from "@ricons/utils";

const Box = ({ title, content, content2, iconSize, iconName }) => {
  return (
    <div className="m-3 flex h-28 w-40 scale-100 flex-col justify-between rounded-xl bg-[#EEF2FF] shadow-xl hover:scale-110 hover:shadow-2xl">
      <h1 className="m-2 p-2 text-black">{title}</h1>
      {typeof content === "string" ? (
        <div className="text-div flex cursor-pointer   items-center justify-between p-3">
          <p className="ml-2">{content}</p>
          <p className="mt-[10px]">
            <Icon size={iconSize} color={"#bd243f"}>
              {iconName}
            </Icon>
          </p>
        </div>
      ) : (
        <div className="number-div flex flex-col items-end justify-between">
          {typeof content2 === "number" ? (
            <div className="f-button right-5 top-2 flex p-4 pt-5">
              <p className="">{content} </p>
              <p className=""> /{content2}</p>
            </div>
          ) : (
            <p className="text-clr p-3 text-3xl font-bold ">{content}</p>
          )}

          <div className="text-div">
            <p className="">
              <Icon size={iconSize} color={"#bd243f"}>
                {iconName}
              </Icon>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Box;
