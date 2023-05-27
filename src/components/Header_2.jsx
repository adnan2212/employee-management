// import Vector from "../assets/img/Vector.png";
import SearchBar from "./SearchBar";

const Header_2 = ({ title }) => {
  return (
    <div className="header flex h-32 items-center justify-between rounded-b-2xl bg-[#2051E5] p-2 pb-0">
      <div>
        {/* <img className="absolute left-0 top-0" src={Vector} alt="Logo" /> */}
      </div>

      <div className="flex items-center justify-center text-white">
        <p className="absolute right-[50%] font-sans text-2xl font-semibold">
          {title}
        </p>
      </div>
      <div className="search-bar flex pt-5">
        <span className="mr-3 ">
          <SearchBar />
        </span>
      </div>
    </div>
  );
};

export default Header_2;
