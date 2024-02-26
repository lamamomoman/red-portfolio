import React, { Profiler, useLayoutEffect, useState } from "react";
import gsap, { mapRange } from "gsap";
import { useEffect, useRef } from "react";
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';




import Loading from './Components/Loading';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';

import './global.css';

function App() {

  const mainRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);

  const meInfo = [8, 2000, 200];



  const letterAnim = (el) => {
    gsap.fromTo(el, {
      top: 200,
      opacity: 0,
      rotateZ: '10deg'
    }, {
      top: 0,
      opacity: 1,
      rotateZ: '0deg',
      stagger: 0.04,
      duration: 0.6,

      ease: 'back.inOut',
    });
  }

  const letterScrollAnim = (el, enter) => {
    const letterScroll = el.querySelectorAll('.letter');

    gsap.fromTo(letterScroll, {
      top: enter ?  -50: 0,
      opacity: enter ? 0 : 1,
    }, {
      top: enter ? 0 : -50,
      opacity: enter ? 1 : 0,
      stagger: 0.04,
      duration: enter ? 0.8 : 0,
      ease: 'elastic.inOut',
    });

  }

  const lineAnim = (el) => {
    gsap.fromTo(el, {
      top: 200,
      opacity: 0
    }, {
      top: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1,
      ease: "back.inOut"
    })
  }

  const fadeIn = (el, enter) => {
    gsap.fromTo(el, {
      top: enter ? -100 : 0,
      opacity: enter ? 0 : 1,
    }, {
      top: enter ? 0 : -100,
      opacity: enter ? 1 : 0,
    })
  }

  const changeRed = (el, enter) => {
    gsap.fromTo(el, {
      color: enter ? 'black' : 'red',
      opacity: enter ? '0.5' : '1',
    }, {
      color: enter ? 'red' : 'black',
      opacity: enter ? '1' : '0.5',
    })
  }

  const runAnimations = () => {
    letterAnim("#first-page-section .split-word .letter");
    lineAnim('.line');
    lineAnim('#first-page-section .mini-heading-section');
  }


  const functionMapping = {
    fadeIn: fadeIn,
    changeRed: changeRed,
    letterAnim: letterAnim,
    letterScrollAnim: letterScrollAnim
  }

  useLayoutEffect(() => {

    window.onload = () => {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  });

  useEffect(() => {
    let animationsRun = "";

    if (mainRef.current) {

      const scroll = new LocomotiveScroll({
        el: mainRef.current,
        smooth: true,
        lerp: 0.08,
        multiplier: 0.6,
        smartphone: {
          smooth: true,
        },
      });

      scroll.on('scroll', (args) => {
        if (args.scroll.y > window.innerHeight * 0.7) {

        }
      })

      scroll.on('call', (func, status, el) => {
        if (func in functionMapping) {
          functionMapping[func](el.el, status === "enter" ? true : false);
        }
      });


      if (pageLoaded && !animationsRun) { runAnimations() }

      // Cleanup function
      return () => {
        scroll.destroy();
      };
    }

  }, [pageLoaded]);

  return <section id="app" className={loading ? 'loading' : ''} >
    <Loading loading={loading} setPageLoaded={setPageLoaded} />

    <section data-scroll-container id="pages" ref={mainRef}>
      <section className="page" id="first-page-section">
        <div id="first-page-image-section">
          <div data-scroll data-scroll-speed={10} className="line"></div>
          <div data-scroll data-scroll-speed={-15} className="line"></div>
          <div data-scroll data-scroll-speed={20} className="line"></div>
          {/* <img data-scroll data-scroll-speed={-2} src="https://images.unsplash.com/photo-1708461244988-6c1898d91066?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /> */}
        </div>
        <div id="section-headings">
          <div id="main-section-headings">
            <WordSplit><h1>RED/MANGO/APPLE</h1></WordSplit>
          </div>
          <div id="mini-headings">
            <div>
              <HeadingSection heading={"Currently"} subHeading={"Student at NJIT"} />
              <HeadingSection heading={"Enjoys"} subHeading={"Reading, Gaming and Coding"} />
              <HeadingSection heading={"Specialized at"} subHeading={"Web Development, UI/UX and Valorant"} />
            </div>
            <div>
              <HeadingSection heading={"Enthusiastic by"} subHeading={"Art, Games and Tech"} />
              <HeadingSection heading={"Residing In"} subHeading={"NJ, United States"} />
            </div>
          </div>
        </div>

      </section>
      <section className="page" id="featured-projects-section">
        <div id="me-intro-section">
          <div data-scroll data-scroll-repeat="true" data-scroll-offset="20%" data-scroll-call="fadeIn" id="me-intro-content">
            <h1>Seasoned software developer crafting innovative
              <span data-scroll-repeat={true} data-scroll-offset={"35%"} data-scroll data-scroll-call="changeRed" className='red'> digital solutions </span>,
              from web pages to complex applications, embracing the journey of
              <span data-scroll data-scroll-offset={"55%"} data-scroll-repeat={true} data-scroll-call="changeRed" className="red"> code magic.</span></h1>
          </div>
          <div data-scroll data-scroll-offset="30%, 60%" data-scroll-call="letterScrollAnim"  id="me-intro-numbers">
            <div className="mini-heading-section">
              <p>Over</p>
              <WordSplit animate={true}><h1>15</h1></WordSplit>
              <p>Project Completions</p>
            </div>
            <div className="mini-heading-section">
              <p>Over</p>
              <WordSplit animate={true}><h1>2000</h1></WordSplit>
              <p>Lines Of Code</p>
            </div>
            <div className="mini-heading-section">
              <p>Over</p>
              <WordSplit animate={true}><h1>200</h1></WordSplit>
              <p>Cups of Cofee consumed</p>
            </div>
            <div className="mini-heading-section">
              <p>Over</p>
              <WordSplit animate={true}><h1>1000</h1></WordSplit>
              <p>Hours on Valorant</p>
            </div>
          </div>
        </div>

      </section>
      <section className="page" id="working-style-section">

      </section>
      <section className="page" id="services-section">

      </section>

      <Footer />
    </section>


  </section >

}

function HeadingSection({ heading, subHeading, id }) {
  return <div className="mini-heading-section">
    <h1 id={id}>{heading}</h1>
    <p>{subHeading}</p>
  </div>
}

export function WordSplit({ children, animate = false }) {

  const letters = children.props.children.split('');

  return <div {...(animate ? { 'data-scroll-speed': '0.6','data-scroll': true} : {})} className={`split-word`}>
    {letters.map((letter, index) => {
      return <span key={index} className="letter">{letter}</span>
    })}
  </div>
}

export default App;

