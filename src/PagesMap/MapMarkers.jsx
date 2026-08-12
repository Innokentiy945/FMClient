import {Source, Layer} from "react-map-gl/maplibre";
import {iconLayer} from "./mapLayers";

export default function MapMarkers({markers = []}) {
    const geoJson = {
        type: "FeatureCollection",
        features: markers.map(marker => ({
            type: "Feature",
            properties: {
                id: marker.id,
                name: marker.tags?.name ?? marker.cuisine ?? marker.amenity ?? "BBQ",
                amenity: marker.amenity,
                cuisine: marker.cuisine,
                address: `${marker.tags?.["addr:street"] ?? ""} ${marker.tags?.["addr:housenumber"] ?? ""}`.trim(),
                email: marker.tags?.email,
                website: marker.tags?.website,
                openingHours: marker.tags?.opening_hours
            },
            geometry: {
                type: "Point",
                coordinates: [
                    Number(marker.lon),
                    Number(marker.lat)
                ]
            }
        }))
    };

    console.log("MARKERS", markers);
    console.log("GEOJSON", geoJson);

    return (
        <Source
            id="bbq"
            type="geojson"
            data={geoJson}
        >
            <Layer {...iconLayer}/>
        </Source>
    );
}
