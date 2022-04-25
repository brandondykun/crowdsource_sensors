import { useEffect } from "react";
import timeFilterHelpers from "../utils/filterHelpers";

const TimeFilter = ({
  setCatAndTimeFilteredPoints,
  categoryFilteredPoints,
  activeTime,
  setActiveTime,
  allPoints,
}) => {
  const handleToggleActive = (duration) => {
    setActiveTime(duration);
  };

  const filterPointsByTime = (points) => {
    if (activeTime === "3h") {
      return timeFilterHelpers.filterPointsByThreeHours(points);
    } else if (activeTime === "12h") {
      return timeFilterHelpers.filterPointsByTwelveHours(points);
    } else if (activeTime === "24h") {
      return timeFilterHelpers.filterPointsByTwentyFourHours(points);
    } else if (activeTime === "72h") {
      return timeFilterHelpers.filterPointsBySeventyTwoHours(points);
    } else if (activeTime === "1W") {
      return timeFilterHelpers.filterPointsByOneWeek(points);
    } else {
      return points;
    }
  };

  useEffect(() => {
    const timeFilteredPoints =
      categoryFilteredPoints && filterPointsByTime(categoryFilteredPoints);
    setCatAndTimeFilteredPoints(timeFilteredPoints);
  }, [activeTime, categoryFilteredPoints, allPoints]);

  return (
    <div className="filter-container">
      <div className="category-filter-container time-filter">
        <button
          onClick={() => handleToggleActive("3h")}
          className={`filter-button ${
            activeTime === "3h" ? `active-filter` : ""
          }`}
        >
          3h
        </button>
        <button
          onClick={() => handleToggleActive("12h")}
          className={`filter-button ${
            activeTime === "12h" ? `active-filter` : ""
          }`}
        >
          12h
        </button>
        <button
          onClick={() => handleToggleActive("24h")}
          className={`filter-button ${
            activeTime === "24h" ? `active-filter` : ""
          }`}
        >
          24h
        </button>
        <button
          onClick={() => handleToggleActive("72h")}
          className={`filter-button ${
            activeTime === "72h" ? `active-filter` : ""
          }`}
        >
          72h
        </button>
        <button
          onClick={() => handleToggleActive("1W")}
          className={`filter-button ${
            activeTime === "1W" ? `active-filter` : ""
          }`}
        >
          1W
        </button>
        <button
          onClick={() => handleToggleActive("All")}
          className={`filter-button ${
            activeTime === "All" ? `active-filter` : ""
          }`}
        >
          All
        </button>
      </div>
    </div>
  );
};

export default TimeFilter;
