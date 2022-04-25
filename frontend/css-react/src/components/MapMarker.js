import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

const MapMarker = ({ point, icon }) => {
  return (
    <Marker
      icon={icon}
      position={[point.location.coordinates[1], point.location.coordinates[0]]}
    >
      <Popup className="pop-up">
        <div>{point.category.name}</div>
        <img alt={point.title} className="popup-image" src={point.image}></img>
        <div className="popup-description">{point.title}</div>
        <Link className="popup-link" to={`/post/${point.id}`}>
          View Full Post
        </Link>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
