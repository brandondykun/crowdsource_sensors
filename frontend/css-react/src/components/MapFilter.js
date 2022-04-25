import { useState, useEffect } from "react";

const MapFilter = ({
  allPoints,
  setCategoryFilteredPoints,
  eventsActive,
  setEventsActive,
  alertsActive,
  setAlertsActive,
  emergenciesActive,
  setEmergenciesActive,
}) => {
  const toggleEvents = () => {
    const updatedState = !eventsActive;
    setEventsActive(updatedState);
  };

  const toggleAlerts = () => {
    const updatedState = !alertsActive;
    setAlertsActive(updatedState);
  };

  const toggleEmergencies = () => {
    const updatedState = !emergenciesActive;
    setEmergenciesActive(updatedState);
  };

  useEffect(() => {
    const filteredPoints =
      allPoints &&
      allPoints.filter((point) => {
        if (point.category.id === 1 && eventsActive) {
          return point;
        }
        if (point.category.id === 2 && alertsActive) {
          return point;
        }
        if (point.category.id === 3 && emergenciesActive) {
          return point;
        }
      });
    setCategoryFilteredPoints(filteredPoints);
  }, [eventsActive, alertsActive, emergenciesActive, allPoints]);

  return (
    <div className="filter-container">
      <div className="category-filter-container">
        <button
          onClick={toggleEvents}
          className={`filter-button  ${eventsActive ? `active-filter` : ""}`}
        >
          Events
        </button>
        <button
          onClick={toggleAlerts}
          className={`filter-button ${alertsActive ? `active-filter` : ""}`}
        >
          Alerts
        </button>
        <button
          onClick={toggleEmergencies}
          className={`filter-button ${
            emergenciesActive ? `active-filter` : ""
          }`}
        >
          Emergencies
        </button>
      </div>
    </div>
  );
};

export default MapFilter;
