import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";

export const ColorIcon = ({ icon }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <FontAwesomeIcon
      icon={icon}
      className={`h-4 w-4 transform transition-transform duration-200 hover:scale-110 ${isClicked ? "text-theme-orange" : "text-theme-white"}`}
      onClick={handleClick}
    />
  );
};

ColorIcon.propTypes = {
  icon: PropTypes.object.isRequired,
};

/* <ColorIcon icon={faCirclePlay} /> */
