import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import MapView from "./MapView";
import SearchBar from "./SearchBar";
import { getMapMarkers } from "../CRUD/ApiHelper";
import GrillDTO from "../CRUD/GrillDTO";

export default function GrillMap() {
    const [markers, setMarkers] = useState([]);
    const [initialMarkers, setInitialMarkers] = useState([]);

    useEffect(() => {
        const loadMarkers = async () => {
            try {
                const data = await getMapMarkers();
                const dtoMarkers = data.map(item => new GrillDTO(item));

                setMarkers(dtoMarkers);
                setInitialMarkers(dtoMarkers);
            } catch (e) {
                console.error("LOAD ERROR", e);
            }
        };

        loadMarkers();
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "100vh"
            }}
        >
            <SearchBar setMarkers={setMarkers} initialMarkers={initialMarkers} />
            <MapView markers={markers} />
        </Box>
    );
}

