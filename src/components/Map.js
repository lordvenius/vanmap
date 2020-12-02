import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import { connect } from "react-redux";
import { getItems, deleteItem, addItem } from "../actions/itemActions";
import { PropTypes } from "prop-types";
import Markers from "./Markers";
import mapStyles from "../css/Map.js";
import compassLogo from "../media/compass.svg";
import vanLogo from "../media/van-3.png";
import "../css/Map.scss";
import { useAuth0 } from "@auth0/auth0-react";

const libraries = ["places"];

const mapContainerStyle = {
  height: "80vh",
  width: "100%",
};

const options = {
  styles: mapStyles,
  //disableDefaultUI: true,
  zoomControl: true,
};

// when map render it focuses on these coordinates
const center = {
  lat: 57.71391,
  lng: 12.00924,
};

function Map(props) {
  const { isAuthenticated, user } = useAuth0();
  // isLoaded = is map loaded, loadError = was there an error when loading map
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });

  //const [markers, setMarkers] = React.useState([]);

  // Select and open a info window on existing marker
  const [selected, setSelected] = React.useState(null);

  // Set state when creating a new marker
  const [newMarkerCoordinates, setNewMarkerCoordinates] = React.useState(null);
  const [newTitle, setTitle] = React.useState(null);
  const [newDescription, setDescription] = React.useState(null);

  // If marker is clicked, info window opens. If already open when clicked, it closes.
  const setSelectedItem = (item) => {
    if (item === selected) {
      setSelected(null);
    } else {
      setSelected(item);
    }
  };

  // Set state when creating new marker
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Use state to create new marker
  const saveMarker = () => {
    if (!isAuthenticated) {
      alert("Log in to see and create spots! :)");
      return;
    }
    console.log(user);

    const newMarker = {
      lat: newMarkerCoordinates.lat,
      lng: newMarkerCoordinates.lng,
      title: newTitle,
      description: newDescription,
    };

    // Save new marker with addItem function from redux
    props.addItem(newMarker);

    // Open info window when marker is created
    setSelectedItem(newMarker);

    // Reset new marker state
    setTitle(null);
    setDescription(null);
    setNewMarkerCoordinates(null);
  };

  // When map is clicked, those coordinates is saved to state
  const createNewMarker = (event) => {
    let lat = event.latLng.lat();
    let lng = event.latLng.lng();
    let markerCoordinatesObject = {
      lat: lat,
      lng: lng,
    };
    setNewMarkerCoordinates(markerCoordinatesObject);
  };

  // ???
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Pans map to given coordinates
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={createNewMarker}
        onLoad={onMapLoad}
      >
        <Search panTo={panTo} />
        <Locate panTo={panTo} />

        {/* Send selectedItem to Markers component to open info window if existing marker is clicked.
                    Send setSelectedItem to Markers component so it can be used from there  */}
        {isAuthenticated && (
          <Markers selectedItem={selected} setSelectedItem={setSelectedItem} />
        )}

        {/* If map is clicked and coordinates is saved to newMarkerCoordinates, the new marker and info window pops up here */}
        {newMarkerCoordinates ? (
          <>
            <Marker
              key={0}
              position={{
                lat: newMarkerCoordinates.lat,
                lng: newMarkerCoordinates.lng,
              }}
              icon={{
                url: vanLogo,
                scaledSize: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
            />
            <InfoWindow
              // If new marker is not saved and infoWindow closes, the unsaved marker is "deleted"
              onCloseClick={() => {
                setNewMarkerCoordinates(null);
              }}
              position={{
                lat: newMarkerCoordinates.lat,
                lng: newMarkerCoordinates.lng,
              }}
            >
              {/* Write and save title and description in the new marker infowindow  */}
              <div>
                <textarea
                  placeholder="Title"
                  onChange={onTitleChange}
                  name="title"
                >
                  {newTitle}
                </textarea>
                <textarea
                  placeholder="Description"
                  onChange={onDescriptionChange}
                  name="description"
                >
                  {newDescription}
                </textarea>

                <button
                  onClick={() => {
                    saveMarker();
                  }}
                >
                  SAVE
                </button>
              </div>
            </InfoWindow>
          </>
        ) : null}
      </GoogleMap>
    </>
  );
}

// Get current posittion and pan to those coordinates by clicking the compass on the map
function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src={compassLogo} alt="compass" />
    </button>
  );
}

// use-places-autocomplete from googleMaps api and combobox to create search function
function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    // If searched place is selected panTo function runs and pans map to that place coordinates
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

Map.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem, addItem })(Map);
