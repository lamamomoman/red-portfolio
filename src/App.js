import React, { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import aboutMe from './about-me2.jpg';




import exp from './exp.json';

import './global.css';
import './App.css'


function App() {

  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  };

  const allImages = importAll(require.context('./projectImages', false, /\.(png|jpe?g|svg)$/));

  const main = useRef();

  const [fadeInEle, setFadeInEle] = useState([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const [isLoaded, setIsLoaded] = useState(false);
  const [forMobile, setForMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 576) { setForMobile(true) }

    //onsole.log("is on mobile = ", forMobile);

    const images = Array.from(main.current.querySelectorAll('img')); // Get all images
    const promises = images.map(img => new Promise(resolve => {
      img.onload = resolve; // Resolve promise when image loads
    }));

    //console.log("images = ", images);

    Promise.all(promises).then(() => setIsLoaded(true));
    console.log(isLoaded);

    const fadeElements = Array.from(main.current.querySelectorAll('.fade-in'));
    setFadeInEle(fadeElements);
    const parallaxElements = Array.from(main.current.querySelectorAll('.parallax-effect1'));
    parallaxElements.forEach((ele) => {
      gsap.fromTo(ele, {
        yPercent: 0,
        transform: 'scale(1.06)'
      }, {
        yPercent: -30,
        transform: 'scale(1)',
        scrollTrigger: {
          trigger: ele,
          scrub: 2,
        }
      });
    });

    gsap.fromTo('.letter-anim', {
      opacity: 1,
      top: 0,
      color: 'black',
    }, {
      opacity: 1,
      color: '#9BA4B5',
      top: forMobile ? '80vh' : '50vh',
      scrollTrigger: {
        scrub: 5,
        trigger: '.letter-anim',
        start: 'top 15%',
        end: 'bottom bottom',
      },
      stagger: forMobile ? 0.2 : 0.4,
      duration: forMobile ? 30 : 10,
      ease: 'back.inOut'
    });

    fadeInEle.forEach((ele) => {
      gsap.fromTo(ele, {
        ease: 'back.inOut',
        opacity: 0,
        top: 200
      }, {
        opacity: 1,
        top: 0,
        scrollTrigger: {
          trigger: ele,
          start: forMobile ? 'top 85%' : 'top 70%',
          end: 'top bottom',
          toggleActions: 'play none reverse none',
        },
        stagger: 2,
        duration: 0.5
      });
    });
  }, [isLoaded, forMobile]);

  useGSAP(() => {
    const line = gsap.timeline({
      scrollTrigger: {
        scrub: 5,
        trigger: "#intro-page",
        start: "top top%",
        endTrigger: "#intro-page-heading",
        end: 'bottom center',
        toggleActions: "play none none none"
      }
    });

    const fadeInCards = Array.from(main.current.querySelectorAll('.fade-in-cards'))

    fadeInCards.forEach((el) => {
      gsap.fromTo(el, {
        opacity: 0,
        rotateX: '100deg',
        top: 200
      }, {
        opacity: 1,
        rotateX: '0deg',
        top: 0,
        scrollTrigger: {
          start: forMobile ? 'top 150%' : 'top 100%',
          trigger: el,
          end: forMobile ? 'bottom 100%' : 'bottom 90%',
          scrub: 5
        },
        stagger: 3,
        duration: 0.9,
        ease: 'power.inOut'
      });
    });

    gsap.fromTo('.work-heading-letters', {
      opacity: 0,
      rotateX: '100deg',
      top: -40,
    }, {
      opacity: 1,
      rotateX: '0deg',
      top: 0,
      scrollTrigger: {
        scrub: 5,
        trigger: '.work-heading-letters',
        start: 'top 60%',
        end: 'bottom 30%',
      },
      stagger: 5,
      duration: 50,
      ease: 'back.inOut'
    });

    line.from(".line", {
      backgroundColor: "black",
      width: "0%",
      opacity: 0.6,
    });

    line.to(".line", {
      width: "100%",
      opacity: 1,
      backgroundColor: "black",
      ease: 'expo.inOut'
    });
  }, [isLoaded, forMobile])

  return <section ref={main} id="app">
    {/* {!isLoaded ? <div id="loading"><h1>Loading</h1></div> : ""} */}
    <div id="intro-page-bg"></div>
    <section id="intro-page-wrapper">
      <div id="intro-page">
        <div id="intro-page-heading">
          <WordSplit className={"letter-anim"}>
            <h1>Creative Developer.</h1>
          </WordSplit>
        </div>
        <div id="intro-page-content" className="fade-in">
          <h1>Where Code Meets Creativity: Transforming Ideas into Digital Wonders!</h1>
        </div>
      </div>
    </section>
    <section id="about-me-wrapper">
      <div id="about-me">
        <div id="about-me-image-wrapper" >
          <div id="about-me-image">
            <img className="parallax-effect1" src={aboutMe} />
          </div>
        </div>
        <div className="fade-in" id="about-me-content-wrapper">
          <div id="about-me-content">
            {forMobile ? "" : <h1>Who is this guy ?</h1>}
            <p>Karthik is not just a code warrior, but a creative architect. He crafts solutions that solve problems with elegance and captivate with their digital brushstrokes. Each project is an ode to innovation, a push against boundaries, leaving a legacy of impactful experiences. This is Karthik: a lifelong learner, a storyteller at heart, and now, an invitation to join him on this digital odyssey, to see what wonders they can weave with the magic of code.</p>
          </div>
        </div>
      </div>
    </section>

    <WorkWrapper />

    <Projects forMobile={forMobile} projectImages={allImages} />

    <div id="line-wrapper">
      <div className="line">
        {/* <img width="50" height="50" src="https://img.icons8.com/ios/50/000000/circled-right-2.png" alt="circled-right-2" /> */}
      </div>
    </div>
  </section>
}

function WorkWrapper() {
  return <section id='work-wrapper'>
    <div id="work-heading-wrapper">
      <WordSplit className={'letter work-heading-letters'} id={"work-heading1"}>
        <h1>Work</h1>
      </WordSplit>
      <WordSplit className={'letter work-heading-letters'} id={"work-heading2"}>
        <h1>Experience</h1>
      </WordSplit>
      <WorkExp />
    </div>
  </section>
}

function WorkExp() {
  return <div id="work-exp-wrapper" className="fade-in">
    {exp.exp.map((e, index) => {
      return <div key={index} className="fade-in-cards work-exp-card" id={e.company}>
        <div>
          <h1>{e.company}</h1>
          <h2>{e.job}</h2>
        </div>
        <div id="work-line">
        </div>
        <div>
          <p>{e.location}</p>
          <p>{e.timeline}</p>
        </div>
      </div>
    })}
  </div>
}

function Projects({ projectImages, forMobile }) {

  const pro = useRef(null);

  useEffect(() => {

    // console.log(projectImages);

    // Array.from(projectImages).map((el) => {
    //   console.log("thisoajhkdajshdkjs");
    //   console.log(el);
    // });
  }, [])

  useGSAP(() => {
    gsap.fromTo('.scroll-text', {
      xPercent: 0,
    }, {
      xPercent: 20,
      scrollTrigger: {
        trigger: '.scroll-text',
        endTrigger: '#projects-wrapper',
        end: 'bottom bottom',
        scrub: 2,
      },
      duration: 10
    });
  }, []);

  const handleMouseEnter = (e) => {
    var projectCards = pro.current.querySelectorAll('.project-card');
    if (!forMobile) {
      projectCards.forEach((el) => {
        if (el === e.target) {
          el.classList.toggle("on");
        }
        else {
          el.classList.toggle("off");
        }
      })
    }
  }

  const handleMouseLeave = (e) => {
    var projectCards = pro.current.querySelectorAll('.project-card');
    if(!forMobile){
      projectCards.forEach((el) => {
        if (el === e.target) {
          el.classList.toggle("on");
        }
        else {
          el.classList.toggle("off")
        }
      })
    }
  }

  const showSection = (e) => {
    console.log(e);
    e.target.parentNode.classList.add('show-project-section');

    var bodyElement = e.target.parentNode;
    while (bodyElement && bodyElement.tagName !== 'BODY') {
      bodyElement = bodyElement.parentNode;
    }
    console.log(bodyElement);
    bodyElement.classList.add('no-scroll');
  }

  const closeSection = (e) => {
    console.log(e);
    e.target.parentNode.classList.remove('show-project-section');
    var bodyElement = e.target.parentNode;
    while (bodyElement && bodyElement.tagName !== 'BODY') {
      bodyElement = bodyElement.parentNode;
    }
    console.log(bodyElement);

    bodyElement.classList.remove('no-scroll');
  }

  return <section ref={pro} id="projects-wrapper">
    <div className="scroll-container">
      <h1 className="scroll-text">Projects Projects Projects Projects Projects Projects Projects Projects</h1>
    </div>
    {exp.projects.map((e, index) => {
      return <div key={index} className="project-card-wrapper">
        <div onClick={showSection} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className="project-card fade-in-cards">
          <div id="project-card-content-wrapper">
            <div id="project-card-content">
              <p>{index + 1} /</p>
              <p className="project-heading-letters">{e.projectTitle}</p>
            </div>
          </div>
        </div>
        <div onClick={closeSection} id="project-card-section">
          <div id="inner-project-section">
            <div id="project-title">
              <h1>{e.projectTitle}</h1>
              {/* <img src={e.projectImage === "" ? "" : projectImages[e.projectImage]} /> */}
            </div>
            <div id="project-details">
              <div id="project-problem">
                <h2>Project Information</h2>
                <p>{e.projectInfo}</p>
              </div>
              <div id="project-skills">
                <h2>Project Skills</h2>
                <p>{e.projectSkills}</p>
              </div>
              <p id="close-card">click anywhere to close</p>
            </div>
          </div>
        </div>
      </div>
    })}
  </section>
}



function WordSplit({ children, id, className }) {

  var letters = children.props.children.split('');

  return <div id={id} className="split-words">
    {letters.map((letter, index) => {
      return <span key={index} className={className}>{letter}</span>
    })}
  </div>
}

export default App;