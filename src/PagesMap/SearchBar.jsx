import { Paper, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear"; // Иконка "крестик" для очистки
import { useState } from "react";
import { searchBbq } from "../CRUD/ApiHelper.js";
import GrillDTO from "../CRUD/GrillDTO.js";

export default function SearchBar({ setMarkers, initialMarkers = [] }) {
    const [query, setQuery] = useState("");

    const search = async () => {
        if (!query.trim()) {
            setMarkers(initialMarkers);
            return;
        }
        try {
            const data = await searchBbq(query);
            setMarkers(data.map(x => new GrillDTO(x)));
        } catch (e) {
            console.error("SEARCH ERROR", e);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);


        if (!value.trim()) {
            setMarkers(initialMarkers);
        }
    };

    const handleClear = () => {
        setQuery("");
        setMarkers(initialMarkers);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            search();
        }
    };

    return (
        <Paper
            sx={{
                position: "absolute",
                zIndex: 1000,
                top: 20,
                left: 20,
                display: "flex",
                p: 1
            }}
        >
            <TextField
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                size="small"
                InputProps={{
                    endAdornment: query && (
                        <IconButton size="small" onClick={handleClear}>
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    )
                }}
            />

            <IconButton onClick={search}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
