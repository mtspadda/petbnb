import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";

const OpenLayersMap = ({ location }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerLayerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          console.log("Geolocation error:", err.message);
          // Fall back to location from the search if available
        },
      );
    }
  }, []);

  // Determine which location to use: search location takes priority
  const activeLocation = location
    ? { lat: location.lat, lon: location.lng }
    : userLocation;

  useEffect(() => {
    // Load OpenLayers JS
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.5/ol.js";
    script.async = true;

    script.onload = () => {
      try {
        if (
          mapRef.current &&
          !mapInstanceRef.current &&
          window.ol &&
          activeLocation
        ) {
          // Initialize the map with active location
          const center = window.ol.proj.fromLonLat([
            activeLocation.lon,
            activeLocation.lat,
          ]);

          mapInstanceRef.current = new window.ol.Map({
            target: mapRef.current,
            layers: [
              new window.ol.layer.Tile({
                source: new window.ol.source.OSM(),
              }),
            ],
            view: new window.ol.View({
              center: center,
              zoom: 13,
            }),
          });

          // Add a marker at active location
          const marker = new window.ol.Feature({
            geometry: new window.ol.geom.Point(center),
          });

          const markerStyle = new window.ol.style.Style({
            image: new window.ol.style.Circle({
              radius: 8,
              fill: new window.ol.style.Fill({ color: "#3f51b5" }),
              stroke: new window.ol.style.Stroke({
                color: "#ffffff",
                width: 2,
              }),
            }),
          });

          marker.setStyle(markerStyle);

          markerLayerRef.current = new window.ol.layer.Vector({
            source: new window.ol.source.Vector({
              features: [marker],
            }),
          });

          mapInstanceRef.current.addLayer(markerLayerRef.current);
          setMapLoaded(true);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    script.onerror = () => {
      setError("Failed to load OpenLayers library");
    };

    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(null);
        mapInstanceRef.current = null;
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [activeLocation]);

  // Update map when search location changes
  useEffect(() => {
    if (mapInstanceRef.current && location && window.ol) {
      const center = window.ol.proj.fromLonLat([location.lng, location.lat]);

      // Animate to new location
      mapInstanceRef.current.getView().animate({
        center: center,
        zoom: 13,
        duration: 1000,
      });

      // Update marker
      if (markerLayerRef.current) {
        const source = markerLayerRef.current.getSource();
        source.clear();

        const marker = new window.ol.Feature({
          geometry: new window.ol.geom.Point(center),
        });

        const markerStyle = new window.ol.style.Style({
          image: new window.ol.style.Circle({
            radius: 8,
            fill: new window.ol.style.Fill({ color: "#3f51b5" }),
            stroke: new window.ol.style.Stroke({
              color: "#ffffff",
              width: 2,
            }),
          }),
        });

        marker.setStyle(markerStyle);
        source.addFeature(marker);
      }
    }
  }, [location]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "grey.100",
      }}
    >
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <MapIcon sx={{ mr: 2 }} />
          <Box>
            <Typography variant="h6" component="h1">
              Lorem ipsum
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              lacus felis, lacinia consectetur elementum sed
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ flex: 1, display: "flex", p: 3 }}>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            height: "600px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {error && (
            <Box sx={{ p: 2 }}>
              <Alert severity="error">
                <Typography variant="subtitle2">Error loading map</Typography>
                <Typography variant="body2">{error}</Typography>
              </Alert>
            </Box>
          )}

          {!mapLoaded && !error && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.paper",
                zIndex: 1,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress size={48} sx={{ mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  Loading map...
                </Typography>
              </Box>
            </Box>
          )}

          <Box
            ref={mapRef}
            sx={{
              flex: 1,
              width: "100%",
              height: "100%",
              minHeight: 0,
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default OpenLayersMap;
