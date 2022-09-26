import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const Error = () => {
    return (
        <div className="errorContainer">
            <FontAwesomeIcon className="errorContainer__icon" icon={faCircleExclamation} />
            <h2>An Error has occurred</h2>
            <p>Please try again later</p>
        </div>
    )
}

export default Error