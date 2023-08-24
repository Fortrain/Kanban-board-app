import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import { BsFillExclamationSquareFill } from "react-icons/bs";
import { GrStatusGoodSmall } from "react-icons/gr";
import "./Card.css";

const Card = ({ id, profileURL, status, title, tag }) => {
	return (
		<div className="card-container border-curve">
			<div className="card-header">
				<p className="header-id">{id}</p>
				{profileURL ? <Avatar src={profileURL} status={status} /> : null}
			</div>
			<div className="card-body">
				<div className="title padding-vertical-sm">
					<p>{title}</p>
				</div>

				<div className="tag-group padding-top-md">
					<div className="alert-icon border-curve">
						<BsFillExclamationSquareFill className="icon" />
					</div>
					<div className="tag padding-sm border-curve">
						<GrStatusGoodSmall className="icon" />
						<p className="tag-text">{tag}</p>
                    </div>
                    
				</div>
			</div>
		</div>
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	profileURL: PropTypes.string,
	status: PropTypes.bool,
	tag: PropTypes.string,
};

export default Card;
