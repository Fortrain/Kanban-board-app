import { API_URL } from "../constants/constants";

export const fetchKanbanData = async () => {
    try {
        const kanbanData = await fetch(API_URL);
        const results = await kanbanData.json();
        return results;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to handle it further up the call stack if needed
    }
};
