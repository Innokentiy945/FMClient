import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function DashboardSearch({ placeholder = "SearchBar...", onSearch }) {
    const [value, setValue] = useState("");

    const handleSearch = () => {
        onSearch(value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSearch(value);
        }
    };

    return (
        <TextField
            size="small"
            fullWidth
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="outlined"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}
