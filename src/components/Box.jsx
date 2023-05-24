import { Icon } from "@ricons/utils";

const Box = ({ title, content, iconSize, iconName }) => {
  return (
    <div className="m-3 h-28 w-44 rounded-xl bg-[#EEF2FF] ">
      <h1 className="m-2 p-2 text-black">{title}</h1>
      <div className="ml-3 flex justify-between py-3">
        <p className="flex-end text-[#2051E5]">{content}</p>
        <p className="mr-4 flex pt-1">
          <Icon size={iconSize} color={"#2051E5"}>
            {iconName}
          </Icon>
        </p>
      </div>
    </div>
  );
};

export default Box;
