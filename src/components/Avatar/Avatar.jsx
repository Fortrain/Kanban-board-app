// import Image from "../Image/Image";
import PropTypes from "prop-types";
import "./Avatar.css";

const Avatar = ({ src, status = false }) => {
    return (
        <div className="avatar-container">
            <div className="image-container">
                <img src={src} className="image" alt="prosper-baba" />
            </div>

            <span
                className={`badge ${status === true ? "available" : ""}`}
            ></span>
        </div>
    );
};

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    status: PropTypes.oneOf([true, false]),
};

export default Avatar;
