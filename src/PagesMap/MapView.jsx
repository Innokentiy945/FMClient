import {useState,useCallback} from "react";
import Map,{Popup} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import MapMarkers from "./MapMarkers";
import {Box} from "@mui/material";

export default function MapView({markers=[]}){
    const [selectedMarker,setSelectedMarker]=useState(null);

    const handleMapLoad=useCallback((event)=>{
        const map=event.target;
        console.log("MAP LOADED");

        const addBBQIcon=()=>{
            console.log("STYLE READY");

            if(map.hasImage("bbq")){
                console.log("BBQ ALREADY EXISTS");
                return;
            }

            fetch("/icons/bbq.png")
                .then(res=>{
                    console.log("FETCH STATUS",res.status,res.headers.get("content-type"));
                    return res.blob();
                })
                .then(blob=>{
                    const img=new Image();

                    img.onload=()=>{
                        map.addImage("bbq",img);
                        console.log("BBQ ICON ADDED");
                    };

                    img.onerror=(e)=>{
                        console.error("IMAGE LOAD ERROR",e);
                    };

                    img.src=URL.createObjectURL(blob);
                })
                .catch(err=>{
                    console.error("FETCH IMAGE ERROR",err);
                });
        };

        if(map.isStyleLoaded()){
            addBBQIcon();
        }else{
            map.once("style.load",addBBQIcon);
        }
    },[]);

    const handleMapClick=useCallback((event)=>{
        const feature=event.features?.[0];

        if(!feature){
            setSelectedMarker(null);
            return;
        }

        if(feature.source!=="bbq") return;

        setSelectedMarker(feature);
    },[]);

    return(
        <Map
            initialViewState={{
                longitude:20.4489,
                latitude:44.7866,
                zoom:12
            }}
            mapStyle="https://tiles.openfreemap.org/styles/positron"
            interactiveLayerIds={["points"]}
            onLoad={handleMapLoad}
            onClick={handleMapClick}
        >
            <MapMarkers markers={markers}/>

            {selectedMarker&&(
                <Popup
                    longitude={selectedMarker.geometry.coordinates[0]}
                    latitude={selectedMarker.geometry.coordinates[1]}
                    anchor="top"
                    onClose={()=>setSelectedMarker(null)}
                >
                    <Box>
                        <strong>
                            {selectedMarker.properties.name}
                        </strong>
                        <br />
                        Amenity: {selectedMarker.properties.amenity}
                        <br />
                        Cuisine: {selectedMarker.properties.cuisine}
                        <br />
                        Address: {selectedMarker.properties.address}
                        <br />
                        Opening hours: {selectedMarker.properties.openingHours}
                        <br />
                        Email: {selectedMarker.properties.email}
                        <br />
                        Website: {selectedMarker.properties.website}
                    </Box>
                </Popup>
            )}
        </Map>
    );
}
