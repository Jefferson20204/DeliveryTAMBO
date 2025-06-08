import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet"; // Libreria para mapas
import L from "leaflet"; // importa toda la librería Leaflet
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import districtsData from "./data/districts.json";
import { useDispatch } from "react-redux";
import { addAddressAPI } from "../../../api/userInfo";
import { saveAddress } from "../../../store/features/user";
import { useNavigate } from "react-router-dom";
import "./AddAddressModal.css";

// Configurar íconos de marcador
const defaultIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const invalidIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Componente para manejar eventos del mapa
function MapEventsHandler({
  setManualPosition,
  districtInfo,
  setIsValidating,
}) {
  const map = useMapEvents({
    click(e) {
      setIsValidating(true);
      setManualPosition(e.latlng);
    },
  });

  useEffect(() => {
    if (districtInfo) {
      map.flyTo(districtInfo.center, 14);
    }
  }, [districtInfo, map]);

  return null;
}

const AddAddressModal = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [addressQuery, setAddressQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [manualPosition, setManualPosition] = useState(null);
  const [addressDetails, setAddressDetails] = useState({
    alias: "",
    floor: "",
    office: "",
    apartment: "",
    reference: "",
  });
  const [isValidLocation, setIsValidLocation] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const mapRef = useRef();

  const districtInfo = districtsData.find((d) => d.name === selectedDistrict);

  // Calcular distancia entre coordenadas
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // Validar si la ubicación está dentro del distrito
  const validateLocation = (lat, lng) => {
    if (!districtInfo) return false;

    const distance = calculateDistance(
      lat,
      lng,
      districtInfo.center[0],
      districtInfo.center[1]
    );

    return distance <= districtInfo.radius;
  };

  // Buscar direcciones
  const searchAddresses = async () => {
    if (!addressQuery.trim() || !selectedDistrict) return;

    setLoading(true);
    setError("");
    try {
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({
        query: `${addressQuery}, ${selectedDistrict}, Lima, Perú`,
      });

      const filteredResults = results.filter((result) => {
        const isInPeru =
          result.y >= -18.4 &&
          result.y <= -0.1 &&
          result.x >= -81.4 &&
          result.x <= -68.7;

        if (!isInPeru) return false;
        if (!districtInfo) return false;

        const distance = calculateDistance(
          result.y,
          result.x,
          districtInfo.center[0],
          districtInfo.center[1]
        );

        return distance <= districtInfo.radius;
      });

      setSearchResults(filteredResults);
      setSelectedResultIndex(null);
    } catch (err) {
      setError("Error al buscar direcciones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Manejar selección de dirección
  const handleSelectAddress = (result, index) => {
    const coords = { lat: result.y, lng: result.x };
    const isValid = validateLocation(result.y, result.x);

    setSelectedLocation({
      latitude: result.y,
      longitude: result.x,
      address: result.label,
    });
    setManualPosition(coords);
    setIsValidLocation(isValid);
    setSelectedResultIndex(index);
    setIsValidating(false);
  };

  // Manejar movimiento manual del marcador
  const handleManualPositionChange = (pos) => {
    setManualPosition(pos);
    setIsValidating(true);

    // Obtener dirección aproximada usando geocodificación inversa
    const getAddressFromCoordinates = async () => {
      try {
        const provider = new OpenStreetMapProvider();
        const results = await provider.search({
          query: `${pos.lat}, ${pos.lng}`,
        });

        if (results.length > 0) {
          const address = results[0].label;
          const isValid = validateLocation(pos.lat, pos.lng);

          setSelectedLocation({
            latitude: pos.lat,
            longitude: pos.lng,
            address: address,
          });
          setIsValidLocation(isValid);
        } else {
          setSelectedLocation({
            latitude: pos.lat,
            longitude: pos.lng,
            address: "Ubicación seleccionada manualmente",
          });
          setIsValidLocation(validateLocation(pos.lat, pos.lng));
        }
      } catch (err) {
        console.error("Error al obtener dirección:", err);
        setSelectedLocation({
          latitude: pos.lat,
          longitude: pos.lng,
          address: "Ubicación seleccionada manualmente",
        });
        setIsValidLocation(validateLocation(pos.lat, pos.lng));
      } finally {
        setIsValidating(false);
        setSelectedResultIndex(null);
      }
    };

    getAddressFromCoordinates();
  };

  // Manejar cambios en los detalles
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Guardar dirección
  const saveAddressDate = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!isValidLocation || !selectedLocation || isValidating) {
      setError("Por favor selecciona una ubicación válida");
      setLoading(false);
      return;
    }

    try {
      const newAddress = {
        ...selectedLocation,
        district: selectedDistrict,
        city: districtInfo.city,
        country: districtInfo.country,
        ...addressDetails,
        isPrimary: false,
      };

      const result = await addAddressAPI(newAddress);

      if (result) {
        dispatch(saveAddress(result));

        // Cerrar el modal y redirigir
        handleClose();
      } else {
        setError("No se pudo guardar la dirección. Inténtalo nuevamente.");
      }
    } catch (err) {
      console.error("Error al guardar dirección:", err);
      setError(
        "Ocurrió un error al guardar la dirección. Por favor intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  // Resetear modal al cerrar
  const handleClose = () => {
    setStep(1);
    setSelectedDistrict("");
    setAddressQuery("");
    setSearchResults([]);
    setSelectedLocation(null);
    setManualPosition(null);
    setAddressDetails({
      alias: "",
      floor: "",
      office: "",
      apartment: "",
      reference: "",
    });
    setIsValidLocation(false);
    setSelectedResultIndex(null);
    setIsValidating(false);
    setError("");
    onHide();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Agregar nueva dirección</h3>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {step === 1 ? (
            <div className="district-selection">
              <div className="form-group">
                <label>Selecciona un distrito</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={loading}
                >
                  <option value="">-- Seleccionar distrito --</option>
                  {districtsData.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDistrict && (
                <>
                  <div className="form-group">
                    <label>Buscar dirección en {selectedDistrict}</label>
                    <div className="search-box">
                      <input
                        type="text"
                        value={addressQuery}
                        onChange={(e) => setAddressQuery(e.target.value)}
                        placeholder="Ej: Av. Los Alisos 123"
                        disabled={loading}
                      />
                      <button
                        className="search-button"
                        onClick={searchAddresses}
                        disabled={loading || !addressQuery.trim()}
                      >
                        {loading ? <span className="spinner"></span> : "Buscar"}
                      </button>
                    </div>
                  </div>

                  {error && <div className="error-message">{error}</div>}

                  {searchResults.length > 0 && (
                    <div className="search-results">
                      <h4>Resultados en {selectedDistrict}:</h4>
                      <div className="results-list">
                        {searchResults.map((result, idx) => (
                          <div
                            key={idx}
                            className={`result-item ${
                              selectedResultIndex === idx ? "selected" : ""
                            }`}
                            onClick={() => handleSelectAddress(result, idx)}
                          >
                            {result.label}
                            {selectedResultIndex === idx && (
                              <span className="selected-badge">
                                ✓ Seleccionado
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="address-confirmation">
              {districtInfo && (
                <>
                  <div className="selected-address">
                    <h4>Dirección seleccionada:</h4>
                    <p className="address-text">
                      {selectedLocation?.address ||
                        "Selecciona una ubicación en el mapa"}
                      {isValidating && (
                        <span className="validating-text">
                          {" "}
                          (Validando ubicación...)
                        </span>
                      )}
                    </p>
                    {selectedLocation && !isValidating && !isValidLocation && (
                      <p className="warning-text">
                        ⚠️ Esta ubicación está fuera de nuestra zona de
                        cobertura
                      </p>
                    )}
                  </div>

                  <div className="map-container">
                    <MapContainer
                      center={districtInfo.center}
                      zoom={14}
                      style={{ height: "300px", width: "100%" }}
                      ref={mapRef}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Circle
                        center={districtInfo.center}
                        radius={districtInfo.radius}
                        color={isValidLocation ? "blue" : "red"}
                        fillColor={isValidLocation ? "blue" : "red"}
                        fillOpacity={0.1}
                      />
                      {manualPosition && (
                        <Marker
                          position={manualPosition}
                          icon={isValidLocation ? defaultIcon : invalidIcon}
                          draggable={true}
                          eventHandlers={{
                            dragstart: () => setIsValidating(true),
                            dragend: (e) =>
                              handleManualPositionChange(e.target.getLatLng()),
                          }}
                        >
                          <Popup>
                            {isValidLocation
                              ? "Ubicación válida. Arrastra para ajustar"
                              : "Ubicación fuera de cobertura"}
                          </Popup>
                        </Marker>
                      )}
                      <MapEventsHandler
                        setManualPosition={handleManualPositionChange}
                        districtInfo={districtInfo}
                        setIsValidating={setIsValidating}
                      />
                    </MapContainer>
                  </div>

                  <div className="map-instructions">
                    <p>
                      • Haz clic en el mapa o arrastra el marcador para
                      seleccionar tu ubicación exacta
                    </p>
                    <p>
                      • El área{" "}
                      {isValidLocation ? (
                        <span className="text-primary">azul</span>
                      ) : (
                        <span className="text-danger">roja</span>
                      )}{" "}
                      muestra nuestra zona de cobertura
                    </p>
                  </div>

                  <div className="form-group">
                    <label>Alias (Ej: Casa, Trabajo)</label>
                    <input
                      type="text"
                      name="alias"
                      value={addressDetails.alias}
                      onChange={handleDetailsChange}
                      placeholder="Nombre para identificar esta dirección"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Piso (opcional)</label>
                      <input
                        type="text"
                        name="floor"
                        value={addressDetails.floor}
                        onChange={handleDetailsChange}
                        placeholder="Número de piso"
                      />
                    </div>
                    <div className="form-group">
                      <label>Oficina/Apto/Dpto (opcional)</label>
                      <input
                        type="text"
                        name="apartment"
                        value={addressDetails.apartment}
                        onChange={handleDetailsChange}
                        placeholder="Número o nombre"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Referencia (opcional)</label>
                    <textarea
                      rows={2}
                      name="reference"
                      value={addressDetails.reference}
                      onChange={handleDetailsChange}
                      placeholder="Ej: Frente al parque, a media cuadra de..."
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          {step === 1 ? (
            <button
              className="primary-button"
              onClick={() => setStep(2)}
              disabled={!selectedDistrict || loading}
            >
              {loading ? <span className="spinner"></span> : "Continuar"}
            </button>
          ) : (
            <button
              className="primary-button"
              onClick={saveAddressDate}
              disabled={
                !isValidLocation || loading || isValidating || !selectedLocation
              }
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Guardando...</span>
                </>
              ) : (
                "Guardar dirección"
              )}
            </button>
          )}
          <button className="secondary-button" onClick={handleClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
