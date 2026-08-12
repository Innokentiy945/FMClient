export const getListBbq = async (page = 1, pageSize = 10) => {

    const apiLink =
        `http://127.0.0.1:8080/listBbq?page=${page}&pageSize=${pageSize}`;

    const response = await fetch(apiLink, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok)
        throw new Error("Failed to fetch data");

    return await response.json();
};

export const getSearchResultDashboard = async (query) => {
    const apiLink = "http://127.0.0.1:8080/searchBbq?query=" + query;

    const response = await fetch(apiLink, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        // credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    return await response.json();
}

export const getMapMarkers = async () => {
    const apiLink = "http://127.0.0.1:8080/getMarkers";
    const response = await fetch(apiLink,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    });

    if(!response.ok){
        throw new Error(
            "Failed to fetch markers"
        );
    }

    return await response.json();
};

export const searchBbq = async (query) => {
    const response = await fetch(
        `http://127.0.0.1:8080/searchBbq?query=${encodeURIComponent(query)}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (!response.ok)
        throw new Error("Search error");

    return await response.json();
};

// https://localhost:4001/listBbq
// https://localhost:4001/searchBbq?query=a
//https://localhost:4001/getMarkers
