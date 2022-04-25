import { useMapEvent } from "react-leaflet";

const UpdateCurrentMapCenter = ({ setCurrentMapCenter, setCurrentZoom }) => {
  const map = useMapEvent("moveend", () => {
    setCurrentMapCenter(map.getCenter());
    setCurrentZoom(map.getZoom());
  });
  return null;
};

export default UpdateCurrentMapCenter;
