import React from 'react';
import Lottie from 'react-lottie';
import loadingSpinnerAnimation from '../lotties/8665-spinner-loading.json';

const LoadingSpinner = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingSpinnerAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className="loadingSpinnerContainer">
            <Lottie
                options={defaultOptions}
                height={200}
                width={200}
            />
            <p className="loadingSpinnerContainer__text">Loading...</p>
        </div>
    )
}

export default LoadingSpinner