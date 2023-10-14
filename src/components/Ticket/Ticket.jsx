import { AiOutlineCheckCircle } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";

import "./Ticket.css";

const TicketCard = ({ id, profileURL, status, title, tag }) => {
    return (
        <div className="ticket-card-container border-curve">
            <div className="ticket-card-header">
                <p className="header-id">{id}</p>
                {profileURL ? (
                    <div>
                        <div className="ticket-image-container">
                            <img
                                src={profileURL}
                                className="image"
                                alt="Profile Avatar"
                            />
                        </div>

                        <span
                            className={`ticket-avatar-holder ${status === true ? "available" : ""}`}
                        ></span>
                    </div>
                ) : null}
            </div>
            <div className="ticket-card">
                <div className="ticket-card-title">
                    <p>{title}</p>
                </div>

                <div className="ticket-tag-container">
                    <div className="tag-icon border-curve">
                        <AiOutlineCheckCircle className="bg-color-icon" />
                    </div>
                    <div className="ticket-card-tag border-curve">
                        <GoDotFill className="bg-color-icon" />
                        <p className="tag-text">{tag}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
