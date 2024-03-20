import { useState, useEffect } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import React from 'react'

function ImageSlider({ slides }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
        const timer = setTimeout(() => {
            setFadeIn(false);
        }, 500); // Adjust the duration of the animation here
        return () => clearTimeout(timer);
    }, [currentIndex])

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };
    const handleImageClick = (event) => {
        // Prevent the click event from propagating to the parent div
        event.stopPropagation();
    };

    return (
        <div className='w-full lg:w-10/12  py-8 relative '>

            <div className={`w-full h-full flex flex-col justify-center items-center opacity-100 `} onClick={handleImageClick} >
                <div className="w-full h-full flex flex-col justify-center p-3 bg-black rounded-md">

                    <img src={`${slides[currentIndex]?.url}`} alt="images" className={`w-full duration-1000 aspect-video`} />

                    <ArrowBackIosNewIcon className="absolute left-3" onClick={prevSlide} />
                    <ArrowForwardIosIcon className="absolute right-3" onClick={nextSlide} />
                </div>
                <div className="flex flex-row">

                    {
                        slides.map((slide, slideIndex) => (
                            <FiberManualRecordIcon sx={{ fontSize: 15 }} onClick={() => goToSlide(slideIndex)} key={slideIndex} />
                        ))
                    }
                </div>
            </div>

        </div>

    );
};



export default ImageSlider;