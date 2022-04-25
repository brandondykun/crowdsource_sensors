import { LayersControl, TileLayer } from "react-leaflet";

const MapTileLayers = ({ selectedMapTileId, setSelectedMapTileId }) => {
  return (
    <>
      <LayersControl.BaseLayer
        checked={
          selectedMapTileId ===
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ? "checked"
            : ""
        }
        name="OpenStreetMap"
      >
        <TileLayer
          eventHandlers={{
            add: (e) => {
              setSelectedMapTileId(e.target._url);
            },
          }}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        checked={
          selectedMapTileId ===
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            ? "checked"
            : ""
        }
        name="World Imagery"
      >
        <TileLayer
          eventHandlers={{
            add: (e) => {
              setSelectedMapTileId(e.target._url);
            },
          }}
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        checked={
          selectedMapTileId ===
          "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            ? "checked"
            : ""
        }
        name="Stadia Smooth"
      >
        <TileLayer
          eventHandlers={{
            add: (e) => {
              setSelectedMapTileId(e.target._url);
            },
          }}
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          maxNativeZoom={20}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        checked={
          selectedMapTileId ===
          "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
            ? "checked"
            : ""
        }
        name="ERSI Nat Geo"
      >
        <TileLayer
          eventHandlers={{
            add: (e) => {
              setSelectedMapTileId(e.target._url);
            },
          }}
          attribution="Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
          maxNativeZoom={18}
          maxZoom={16}
        />
      </LayersControl.BaseLayer>
    </>
  );
};

export default MapTileLayers;
