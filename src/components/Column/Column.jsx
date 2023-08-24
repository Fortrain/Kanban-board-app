/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import "./Column.css";
import { BsFillBarChartFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";

function Column({ tickets, header }) {
    return (
        <div className="column-container padding-sm">
            <div className="column-header margin-bottom-lg">
                <div>
                    <div className="flex gap-md">
                        <BsFillBarChartFill className="icon" />
                        <p>{header}</p>
                        <span>{tickets.length}</span>
                    </div>
                </div>

                <div className="flex gap-sm">
                    <AiOutlinePlus className="icon" />
                    <BiDotsHorizontalRounded className="icon" />
                </div>
            </div>

            <div className="column-body">
                {tickets.map((ticket) => {
                    return (
                        <Card
                            key={ticket.id}
                            id={ticket.id}
                            profileURL="https://bit.ly/prosper-baba"
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

export default Column;
