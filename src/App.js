import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './global.css';
import './App.css'


function App() {
  
  const main = useRef();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        scrub: 5,
        pin: true,
        trigger: "#line-wrapper",
        start: "top 0%",
        endTrigger: "#intro-page-heading",
        end: "bottom center"
      }
    });

    tl.from(".line", {
      opacity: 0.6,
      height: "0%",
      width: "2%"
    });

    tl.to(".line", {
      height: "100%",
      width: "100%",
      opacity: 1,
    });

    gsap.fromTo('.fade-in', {
      opacity: 0,
      top: 200
    }, {
      opacity: 1,
      top: 0,
      scrollTrigger: {
        trigger: '.fade-in',
        start: 'center 40%',
        end: 'bottom bottom',
        toggleActions: 'play none reverse none',
      },
    });

    gsap.fromTo('.letter-anim', {
      opacity: 1,
      top: 0,
      color: 'black',
    }, {
      opacity: 1,
      top: '80vh',
      color: '#E9ECEF',
      scrollTrigger: {
        scrub: 5,
        trigger: '.letter-anim',
        start: 'top 15%',
        end: 'bottom top',
      },
      stagger: 0.8,
      duration: 50,
      ease: 'back.inOut'
    });
  }, { scope: main })

  return <section ref={main} id="app">
    <section id="intro-page-wrapper">
      <div id="intro-page">
        <div id="intro-page-heading">
          <WordSplit className={"letter letter-anim"}>
            <h1>Creative Developer.</h1>
          </WordSplit>
        </div>
        <div id="intro-page-content" className="fade-in">
          <p>Behold, the creative web developer and designer, a master of technical expertise and artistic vision. With a problem-solving mindset and excellent communication skills, they craft captivating user experiences and transform abstract concepts into visually stunning interfaces. Armed with the latest industry knowledge, they deliver innovative and efficient websites that exceed expectations. Their work is a testament to their unwavering dedication, leaving a trail of awe-inspiring digital creations that resonate with hearts and minds.</p>
        </div>
      </div>
    </section>
    <section id="about-me-wrapper">
      <div id="about-page">
        <h1>hello</h1>
      </div>
    </section>
    <div id="line-wrapper">
      <div className="line">

      </div>
    </div>
  </section>
}

function WordSplit({ children, id, className }) {

  var letters = children.props.children.split('');

  useEffect(() => {
    console.log(letters);
  });

  return <div id={id} className="split-words">
    {letters.map((letter, index) => {
      return <span key={index} className={className}>{letter}</span>
    })}
  </div>
}

export default App;