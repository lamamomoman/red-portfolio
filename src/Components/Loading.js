import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { WordSplit } from "../App";
import '../Styles/loading.css';
import '../App.css';

function Loading({ loading, setPageLoaded }) {
    const [pageLoaded, updatePageLoaded] = useState(!loading);
    const loadingRef = useRef(null);

    console.log("actual loading = ", loading);

    useEffect(() => {
        console.log("----------page update----------");
        const loadingSection = loadingRef.current;
        const splitWordLetters = loadingSection.querySelectorAll(".split-word .letter");

        const animateLoadingOn = () => {
            gsap.fromTo(splitWordLetters, {
                scale: 1,
                top: 10,
                opacity: 0,
            }, {
                scale: 0,
                top: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.2,
                ease: 'sine.inOut',
                onComplete: () => {
                    if(!pageLoaded)
                        animateLoadingOff();
                }
            });
        };

        const animateLoadingOff = () => {
            gsap.to(splitWordLetters, {
                top: -10,
                opacity: 0,
                stagger: 0.05,
                duration: 0.2,
                ease: 'sine.inOut',
                onComplete: () => {
                    if(!pageLoaded)
                        animateLoadingOn();
                }
            });
        };

        const showLoadingSection = () => {
            gsap.fromTo(loadingSection, {
                top: "0%",
            }, {
                top: 0,
                duration: 2,
                ease: 'expo.inOut'
            });
        };

        const hideLoadingSection = () => {
            gsap.to(loadingSection, {
                top: "100%",
                duration: 2,
                ease: 'expo.inOut',
                onUpdate: () => {
                    // Check if the animation progress is approximately halfway
                    if (gsap.getProperty(loadingSection, "top") > 50) {
                        setPageLoaded(true);
                    }
                },
                onComplete: () => {
                    updatePageLoaded(true);
                }
            });
        };


        if (loading) {
            showLoadingSection();
            animateLoadingOn();
            console.log("STILL LOADING");
        } else {
            hideLoadingSection();
        }

        // return () => {
        //     gsap.killTweensOf(splitWordLetters);
        // };
    }, [loading, setPageLoaded, pageLoaded]);


    return (
        <section ref={loadingRef} id="loading-section">
            {pageLoaded ? "" : <WordSplit><h1>_______</h1></WordSplit>}
        </section>
    );
}

export default Loading;
