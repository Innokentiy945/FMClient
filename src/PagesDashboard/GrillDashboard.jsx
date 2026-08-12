import { useEffect, useState } from "react";
import {
    List,
    Link,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    Pagination,
    Stack,
    CircularProgress,
} from "@mui/material";

import { getListBbq, getSearchResultDashboard } from "../CRUD/ApiHelper.js";
import GrillDTO from "../CRUD/GrillDTO.js";
import DashboardSearch from "./DashboardSearch/DashboardSearch.jsx";

export default function GrillDashboard() {

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const pageSize = 10;

    const loadData = async (currentPage) => {

        setLoading(true);

        try {

            const data = await getListBbq(currentPage, pageSize);

            const list = Array.isArray(data) ? data : [data];

            setItems(
                list.map(item => new GrillDTO(item))
            );

        } catch (e) {

            console.error(e);

        } finally {

            setLoading(false);

        }
    };

    const handleSearch = async (query) => {

        setLoading(true);

        try {

            const data = await getSearchResultDashboard(query);

            const list = Array.isArray(data) ? data : [data];

            setItems(
                list.map(item => new GrillDTO(item))
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        loadData(page);

    }, [page]);

    const handlePageChange = (_, value) => {

        setPage(value);

    };

    return (

        <Paper sx={{ p: 2 }}>

            <Typography variant="h6" gutterBottom>
                Belgrade Grill Places
            </Typography>

            <DashboardSearch
                placeholder="Search by name..."
                onSearch={handleSearch}
            />

            {loading ? (

                <CircularProgress />

            ) : (

                <List>

                    {items.map((item) => (

                        <ListItem key={item.id} divider>

                            <ListItemText

                                primary={
                                    item.tags?.["name:sr-Latn"] ??
                                    item.tags?.name
                                }

                                secondary={
                                    <>

                                        <Typography component="div" variant="body2">
                                            Amenity: {item.amenity}
                                        </Typography>

                                        {item.tags?.phone && (

                                            <Typography component="div" variant="body2">
                                                Phone: {item.tags.phone}
                                            </Typography>

                                        )}

                                        {Object.entries(item.tags || {})

                                            .filter(([key, value]) =>
                                                (
                                                    key.includes("website") ||
                                                    key.includes("instagram") ||
                                                    key.includes("facebook") ||
                                                    key.includes("contact")
                                                ) &&
                                                typeof value === "string"
                                            )

                                            .map(([key, value]) => (

                                                <Typography
                                                    key={key}
                                                    component="div"
                                                    variant="body2"
                                                >

                                                    {key}:{" "}

                                                    <Link
                                                        href={
                                                            value.startsWith("http")
                                                                ? value
                                                                : `https://${value}`
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {value}
                                                    </Link>

                                                </Typography>

                                            ))}

                                    </>
                                }

                            />

                        </ListItem>

                    ))}

                </List>

            )}

            <Stack alignItems="center" mt={2}>

                <Pagination
                    page={page}
                    onChange={handlePageChange}
                    count={1}
                    color="primary"
                />

            </Stack>

        </Paper>

    );

}
