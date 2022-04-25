import { MapContainer, LayersControl } from "react-leaflet";
import apiCalls from "../apis/apiCalls";
import { useEffect, useState } from "react";
import leafletIcons from "../utils/leafletIcons";
import { latLng, latLngBounds } from "leaflet";
import UpdateCurrentMapCenter from "../components/UpdateCurrentMapCenter";
import MapTileLayers from "../components/MapTileLayers";
import MapMarker from "../components/MapMarker";
import MapFilter from "../components/MapFilter";
import TimeFilter from "../components/TimeFilter";

const MapPage = ({
  currentMapCenter,
  setCurrentMapCenter,
  currentZoom,
  setCurrentZoom,
  eventsActive,
  setEventsActive,
  alertsActive,
  setAlertsActive,
  emergenciesActive,
  setEmergenciesActive,
  selectedMapTileId,
  setSelectedMapTileId,
  activeTime,
  setActiveTime,
  userLocated,
}) => {
  const [allPoints, setAllPoints] = useState(null);
  const [categoryFilteredPoints, setCategoryFilteredPoints] =
    useState(allPoints);
  const [catAndTimeFilteredPoints, setCatAndTimeFilteredPoints] =
    useState(allPoints);

  const getAllPoints = async () => {
    const allPointsResponse = await apiCalls.getAllPosts();
    if (allPointsResponse) {
      setAllPoints(allPointsResponse);
    } else {
      setAllPoints([]);
    }
  };

  useEffect(() => {
    getAllPoints();
  }, []);

  const getCategoryIcon = (post) => {
    if (post.category.id === 1) {
      return leafletIcons.greenIcon;
    } else if (post.category.id === 2) {
      return leafletIcons.goldIcon;
    } else {
      return leafletIcons.redIcon;
    }
  };

  const corner1 = latLng(-90, -180);
  const corner2 = latLng(90, 180);
  const bounds = latLngBounds(corner1, corner2);

  if (!userLocated) {
    return (
      <div className="main-content">
        <div className="loading-message">MAP LOADING...</div>
      </div>
    );
  }

  return (
    <div className="map-content">
      <MapFilter
        allPoints={allPoints}
        setCategoryFilteredPoints={setCategoryFilteredPoints}
        eventsActive={eventsActive}
        setEventsActive={setEventsActive}
        alertsActive={alertsActive}
        setAlertsActive={setAlertsActive}
        emergenciesActive={emergenciesActive}
        setEmergenciesActive={setEmergenciesActive}
      />
      <MapContainer
        center={currentMapCenter}
        zoom={currentZoom}
        scrollWheelZoom={true}
        minZoom={3}
        maxBounds={bounds}
      >
        <UpdateCurrentMapCenter
          setCurrentMapCenter={setCurrentMapCenter}
          setCurrentZoom={setCurrentZoom}
        />

        <LayersControl position="topright">
          <MapTileLayers
            selectedMapTileId={selectedMapTileId}
            setSelectedMapTileId={setSelectedMapTileId}
          />
        </LayersControl>
        {catAndTimeFilteredPoints &&
          catAndTimeFilteredPoints.map((point) => {
            if (point.location) {
              const icon = getCategoryIcon(point);
              return <MapMarker key={point.id} point={point} icon={icon} />;
            }
          })}
      </MapContainer>
      <TimeFilter
        setCatAndTimeFilteredPoints={setCatAndTimeFilteredPoints}
        categoryFilteredPoints={categoryFilteredPoints}
        activeTime={activeTime}
        setActiveTime={setActiveTime}
        allPoints={allPoints}
      />
    </div>
  );
};

export default MapPage;
