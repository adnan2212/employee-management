import React from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar = ({ percentage1, percentage2 }) => {
  const sum = percentage1 + percentage2 / 200;

  return (
    <div className="flex items-center justify-center">
      <div className="w-48">
        <div className="m-4">
          <CircularProgressbarWithChildren
            value={sum}
            styles={buildStyles({
              pathColor: "#F77307",
              trailColor: "#eee",
              strokeLinecap: "butt"
            })}
          >
            {/* Foreground path */}
            <CircularProgressbar
              value={percentage2}
              text={`${sum}%`}
              styles={buildStyles({
                trailColor: "transparent",
                strokeLinecap: "butt"
              })}
            />
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
