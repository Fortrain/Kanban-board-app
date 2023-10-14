
import Ticket from "../Ticket/Ticket";
import "./BoardCover.css";

import {BsPlusCircleDotted} from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { HiGlobeAlt } from "react-icons/hi2";
import { PiCellSignalLowFill, PiCellSignalMediumFill,  PiCellSignalHighFill, PiCellSignalFullFill} from "react-icons/pi";



function BoardCover({ tickets, header }) {

    const iconMapping = {
        Low: <PiCellSignalLowFill className="bg-color-status-icon" />,
        Medium: <PiCellSignalMediumFill className="bg-color-status-icon" />,
        High: <PiCellSignalHighFill className="bg-color-status-icon" />,
        Urgent: <PiCellSignalFullFill className="bg-color-status-icon" />,
      };
      
      const iconComponent = iconMapping[header] || <HiGlobeAlt className="bg-color-status-icon" />;

    return (
        <div className="board-container">
            <div className="board-header">
                <div>
                    <div className="flex-gap">
                        {iconComponent}
                        <p className="header-title">{header}</p>
                        <span className="header-title-length">{tickets.length}</span>
                    </div>
                </div>

                <div className="flex-gap">
                    <BsPlusCircleDotted className="bg-color-icon" />
                    <BiDotsHorizontalRounded className="bg-color-icon" />
                </div>
            </div>

            <div className="board-main">
                {tickets.map((ticket) => {
                    return (
                        <Ticket
                            key={ticket.id}
                            id={ticket.id}
                            profileURL={`https://picsum.photos/id/${Math.floor(Math.random()*401)}/200`}
                            status={ticket.status}
                            title={ticket.title}
                            tag={ticket.tag[0]}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default BoardCover;
