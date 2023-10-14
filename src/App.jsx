import { useState } from "react";
import BoardCover from "./components/BoardCover/BoardCover";
import { GroupingList, OrderingList, priorityMap } from "./apiData/apiData";

import "./App.css";
import { useEffect } from "react";
import { ordering, groups } from "./selectElements/selectElements";
import { getLocalStorageItem,  setLocalStorageItem  } from "./helpers/localStorage";
import { fetchKanbanData } from "./services/fetchData";

import { VscSettings } from "react-icons/vsc";


function groupTicketsByProperty(property, state) {
    const grpTickets = {};

    state.forEach((ticket) => {
        const val = ticket[property];

        if (!grpTickets[val]) grpTickets[val] = [];

        grpTickets[val].push(ticket);
    });

    return grpTickets;
}

function App() {
    
    const [tickets, setTickets] = useState();
    const [users, setUsers] = useState();
    
    const [selectedGrouping, setSelectedGrouping] = useState(() => {
        const ss = getLocalStorageItem("selectedgrouping");
        return ss ? ss : groups.STATUS;
    });
    const [selectedOrdering, setSelectedOrdering] = useState(() => {
        const ss = getLocalStorageItem("selectedordering");
        return ss ? ss : ordering.PRIORITY;
    });
    const [displayState, setDisplayState] = useState(() => {
        const ss = getLocalStorageItem("currentstate");
        return ss ? ss : [];
    });
    const [showFilterContainer, setShowFilterContainer] = useState(false);

    useEffect(() => {
        const loadKanbanData = async () => {
            try {
                const results = await fetchKanbanData();
                // Now you can use the 'results' data here
                setTickets(results.tickets);
                setUsers(results.users);
            } catch (error) {
                // Handle the error if necessary
                console.error("Error loading kanban data:", error);
            }
        };
        loadKanbanData();
    }, []);

    useEffect(() => {
        if (tickets === undefined) return;
        if (displayState.length === 0) {
            const ticketsGroupedByStatus = groupTicketsByProperty(
                "status",
                tickets
            );
            setDisplayState(ticketsGroupedByStatus);
            setLocalStorageItem("currentstate", ticketsGroupedByStatus);
        }
    }, [tickets]);

    function getName(id) {
        const user = users.find((u) => u.id === id);
        return user ? user.name : "User not found";
    }

    const groupHandler = (e) => {
        setShowFilterContainer(false);
        setSelectedGrouping(e.target.value);
        setLocalStorageItem("selectedgrouping", e.target.value);
        if (e.target.value === "user") {
            const ticketsGroupedByName = groupTicketsByProperty(
                "userId",
                tickets
            );
            Object.keys(ticketsGroupedByName).forEach(function (key) {
                var newkey = getName(key);
                ticketsGroupedByName[newkey] = ticketsGroupedByName[key];
                delete ticketsGroupedByName[key];
            });

            setDisplayState(ticketsGroupedByName);
            setLocalStorageItem("currentstate", ticketsGroupedByName);
        } else if (e.target.value === "status") {
            const ticketsGroupedByStatus = groupTicketsByProperty(
                "status",
                tickets
            );
            setDisplayState(ticketsGroupedByStatus);
            setLocalStorageItem("currentstate", ticketsGroupedByStatus);
        } else if (e.target.value === "priority") {
            const ticketsGroupedByPriority = groupTicketsByProperty(
                "priority",
                tickets
            );

            Object.keys(ticketsGroupedByPriority).forEach(function (key) {
                var newkey = priorityMap[key];
                ticketsGroupedByPriority[newkey] =
                    ticketsGroupedByPriority[key];
                delete ticketsGroupedByPriority[key];
            });
            setDisplayState(ticketsGroupedByPriority);
            setLocalStorageItem("currentstate", ticketsGroupedByPriority);
        }
    };
    const orderHandler = (e) => {
        setShowFilterContainer(false);
        setSelectedOrdering(e.target.value);
        setLocalStorageItem("selectedordering", e.target.value);
        if (e.target.value === "priority") {
            const sortTasksByPriority = (tasks) => {
                return tasks.slice().sort((a, b) => b.priority - a.priority);
            };

            const sortedData = {};

            for (const userName in displayState) {
                const userTasks = displayState[userName];
                const sortedTasks = sortTasksByPriority(userTasks);
                sortedData[userName] = sortedTasks;
            }

            setDisplayState(sortedData);
            setLocalStorageItem("currentstate", sortedData);
        } else if (e.target.value === "title") {
            const sortTasksByTitleAscending = (tasks) => {
                return tasks
                    .slice()
                    .sort((a, b) => a.title.localeCompare(b.title));
            };

            const sortedData = {};

            for (const userName in displayState) {
                const userTasks = displayState[userName];
                const sortedTasks = sortTasksByTitleAscending(userTasks);
                sortedData[userName] = sortedTasks;
            }
            setDisplayState(sortedData);
            setLocalStorageItem("currentstate", sortedData);
        }
    };

    return (
        <article>
            <header>
                <div className="select-container">
                    <div
                        className="display-button border-curve pointer"
                        onClick={() => {
                            setShowFilterContainer((prev) => !prev);
                        }}
                    >
                        <VscSettings />
                        <p>Display</p>
                    </div>
                    {showFilterContainer ? (
                        <div className="select-popup border-curve">
                            <div className="flex-container">
                                <p>Grouping</p>
                                <select
                                    className="select-element"
                                    name="group-select"
                                    onChange={(e) => groupHandler(e)}
                                    value={selectedGrouping}
                                >
                                    {GroupingList.map((item) => (
                                        <option
                                            value={item}
                                            label={item}
                                            key={item}
                                        />
                                    ))}
                                </select>
                            </div>

                            <div className="flex-container">
                                <p>Ordering</p>
                                <select
                                    className="select-element"
                                    name="order-select"
                                    onChange={(e) => orderHandler(e)}
                                    value={selectedOrdering}
                                >
                                    {OrderingList.map((item) => (
                                        <option
                                            value={item}
                                            label={item}
                                            key={item}
                                        />
                                    ))}
                                </select>
                            </div>
                        </div>
                    ) : null}
                </div>
            </header>
            <main className="main-container">
                <div className="board-grid-container">
                    <div className="board-grid-inner">
                        {Object.keys(displayState).map((data) => {
                            return (
                                <BoardCover
                                    header={data}
                                    tickets={displayState[data]}
                                    key={data}
                                />
                            );
                        })}
                    </div>
                </div>
            </main>
        </article>
    );
}

export default App;
