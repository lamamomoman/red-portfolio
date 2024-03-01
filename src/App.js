import React, { Profiler, useLayoutEffect, useState } from "react";
import gsap, { mapRange } from "gsap";
import { useEffect, useRef } from "react";
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

import brainStorm from './Icons/Brainstorm animated.gif';
import prototype from './Icons/Prototype Animated Icons.gif';
import code from './Icons/Code icons.gif';
import truck from './Icons/Truck icon.gif';


import Loading from './Components/Loading';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';

import './global.css';

function App() {

  const mainRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [forMobile, updateForMobile] = useState(false);

  const handleServiceClick = (el) => {
    el.target.classList.toggle('show-service');
  }


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

      ease: 'circ.inOut',
    });
  }

  const letterScrollAnim = (el, enter) => {
    const letterScroll = el.querySelectorAll('.letter');

    gsap.fromTo(letterScroll, {
      top: enter ? 100 : 0,
      opacity: enter ? 0 : 1,
    }, {
      top: enter ? 0 : 50,
      opacity: enter ? 1 : 0,
      stagger: enter ? 0.04 : 0,
      duration: 0.5,
      ease: 'circ.inOut',
    });

  }


  const letterScrollAnimSped = (el, enter) => {
    const letterScroll = el.querySelectorAll('.letter');

    gsap.fromTo(letterScroll, {
      top: enter ? 100 : 0,
      opacity: enter ? 0 : 1,
    }, {
      top: enter ? 0 : 50,
      opacity: enter ? 1 : 0,
      stagger: enter ? 0.01 : 0,
      duration: 0.3,
      ease: 'circ.inOut',
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
      ease: "sine.inOut"
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

  const scaleOpacImage = (el) => {
    gsap.fromTo(el, {
      scale: 1.1,
      opacity: 0.5,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'power.inOut'
    });
  }

  const fadeInCards = (el, enter) => {
    console.log(el);
    gsap.fromTo(el.querySelectorAll('.project-window'), {
      transform: 'scale(1.01)',
      opacity: 0,
      top: 100
    }, {
      transform: 'scale(1)',
      opacity: 1,
      top: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power.inOut'
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

  const serviceCardAnim = (el) => {
    const tl = gsap.timeline();

    tl.add(
      gsap.fromTo(
        el.querySelectorAll('#service-heading .plus'),
        { opacity: 0, top: 100 },
        { opacity: 1, top: 0, stagger: 0.15, duration: 0.4 }
      )
    );
    tl.add(gsap.fromTo(el.querySelectorAll("#service-heading .first-heading"),
      {
        opacity: 0,
        top: -100
      },
      {
        opacity: 1,
        top: 0,
        stagger: 0.15,
        duration: 0.4
      }));
  }


  //initial animations, that run after the loading screen fades.
  const runAnimations = () => {
    letterAnim("#first-page-section .split-word .letter");
    scaleOpacImage('#first-page-image-section img');
    //lineAnim('.line');
    lineAnim('#first-page-section .mini-heading-section');
  }


  const functionMapping = {
    fadeIn: fadeIn,
    changeRed: changeRed,
    letterAnim: letterAnim,
    letterScrollAnim: letterScrollAnim,
    letterScrollAnimSped: letterScrollAnimSped,
    fadeInCards: fadeInCards,
    serviceCardAnim: serviceCardAnim,
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

    if (window.innerHeight < "576px") {
      updateForMobile(true);
      console.log("forMobile=", forMobile);
    }

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

  }, [pageLoaded, loading, forMobile]);

  return <section id="app" className={loading ? 'loading' : ''} >
    <Loading loading={loading} setPageLoaded={setPageLoaded} />

    <section data-scroll-container id="pages" ref={mainRef}>
      <section className="page" id="first-page-section">
        <div id="first-page-image-section">
          {/* <div data-scroll data-scroll-speed={10} className="line"></div>
          <div data-scroll data-scroll-speed={-15} className="line"></div>
          <div data-scroll data-scroll-speed={20} className="line"></div> */}
          <img data-scroll-speed={-2} data-scroll data-scroll-call="lineAnim" src="https://images.unsplash.com/photo-1530128051436-3ab3663a4683?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
        <div id="section-headings">
          <div id="main-section-headings">
            <WordSplit><h1>RED [MANGO] APPLE</h1></WordSplit>
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
          <div data-scroll id="me-intro-content">
            <h1>Seasoned software developer crafting innovative
              <span data-scroll-repeat={true} data-scroll-offset={"25%"} data-scroll data-scroll-call="changeRed" className='red'> digital solutions </span>,
              from web pages to complex applications, embracing the journey of
              <span data-scroll data-scroll-offset={"40%"} data-scroll-repeat={true} data-scroll-call="changeRed" className="red"> code magic.</span></h1>
          </div>
          <div data-scroll data-scroll-offset="30%, 60%" data-scroll-call="letterScrollAnim" id="me-intro-numbers">
            <div className="mini-heading-section">
              <WordSplit animate={true}><h1>15+</h1></WordSplit>
              <p>Project Completions</p>
            </div>
            <div className="mini-heading-section">

              <WordSplit animate={true}><h1>2000+</h1></WordSplit>
              <p>Lines Of Code</p>
            </div>
            <div className="mini-heading-section">

              <WordSplit animate={true}><h1>200+</h1></WordSplit>
              <p>Cups of Coffee consumed</p>
            </div>
            <div className="mini-heading-section">
              <WordSplit animate={true}><h1>1000+</h1></WordSplit>
              <p>Hours on Valorant</p>
            </div>
          </div>
        </div>

        <div id="featured-projects-wrapper">
          <div id="project-wrapper-heading" data-scroll data-scroll-offset={"60%"} data-scroll-call="letterScrollAnim">
            <WordSplit animate={true}><h1>Featured Projects</h1></WordSplit>
          </div>
          <div data-scroll data-scroll-call="fadeInCards" data-scroll-offset={"50%"} id="project-windows-grid">
            <div className="project-window">
              <div id="project-image-wrapper">
                <img data-scroll data-scroll-speed={-1} src="https://images.unsplash.com/photo-1606516170542-2a6a36ab1562?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8" />
              </div>
              <div id="project-window-content">
                <h1>Book Exchange Club and Web API</h1>
                <h1>UI/UX · MERN · Full Stack</h1>
              </div>
            </div>
            <div className="project-window">
              <div id="project-image-wrapper">
                <img data-scroll data-scroll-speed={-1} src="https://images.unsplash.com/photo-1618423771880-2bcfa6b67c89?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHJlZHxlbnwwfHwwfHx8MA%3D%3D" />
              </div>
              <div id="project-window-content">
                <h1>The Biker Gang</h1>
                <h1>UI/UX · Web Development . Database Design</h1>
              </div>
            </div>
            <div className="project-window">
              <div id="project-image-wrapper">
                <img data-scroll data-scroll-speed={-1} src="https://images.unsplash.com/photo-1621257428217-852546ff30f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D" />
              </div>
              <div id="project-window-content">
                <h1>Anime Hub</h1>
                <h1>React · API  Integration · Front End Devlopment</h1>
              </div>
            </div>
          </div>
        </div>

      </section>
      <section className="page" id="working-style-section">
        <div id="work-style-heading" data-scroll data-scroll-call="letterScrollAnim">
          <WordSplit animate={true}><h1>Explore,Invent,Enhance.</h1></WordSplit>
        </div>
        <div id="working-style">
          <div className='work-style-container'>
            <div id="work-heading">
              <h1>Innovate and Craft</h1>
            </div>
            <p>
              <img src={brainStorm} /> <br></br>
              Venturing into innovation, I embark on crafting
              <span data-scroll data-scroll-offset={"40%"} data-scroll-repeat={true} data-scroll-call="changeRed" className="red"> novel solutions </span>
              that push the boundaries of what's possible. Through innovative thinking and
              <span data-scroll data-scroll-offset={"40%"} data-scroll-repeat={true} data-scroll-call="changeRed" className="red"> meticulous craftsmanship </span>,
              I shape ideas into tangible experiences that captivate and inspire. With each creation, I aim to leave an indelible mark on the digital landscape,
              driving forward the evolution of user-centric design.
            </p>
          </div>
          <div className='work-style-container'>
            <div id="work-heading">
              <h1>Prototype & Perfect</h1>
            </div>
            <p>
              <img src={prototype} /> <br></br>
              As I delve into prototyping, I iterate tirelessly to refine and perfect the user experience. From initial concepts to
              <span data-scroll data-scroll-offset={"40%"} data-scroll-repeat={true} data-scroll-call="changeRed" className="red"> polished prototypes </span>,
              I strive for perfection, incorporating feedback and
              <span data-scroll data-scroll-offset={"40%"} data-scroll-repeat={true} data-scroll-call="changeRed" className="red"> fine tuning every detail </span>
              to ensure a seamless and intuitive design. Through this iterative process, I transform visions into reality,
              turning ideas into intuitive interfaces that resonate with users.
            </p>

          </div>
          <div className='work-style-container'>
            <div id="work-heading">
              <h1>Code & Create</h1>
            </div>
            <p>
              <img src={code} /><br></br>
              Immersed in coding, I unleash my creativity to craft elegant and efficient solutions. With lines of code,
              I bring ideas to life, blending functionality with imagination to create software that is both powerful and user-friendly.
              Through the art of coding, I embrace the challenge of
              <span data-scroll data-scroll-offset={"40%"} data-scroll-repeat={true} data-scroll-call="changeRed" className="red"> transforming complex concepts </span> into intuitive user experiences that elevate and inspire.
            </p>
          </div>
          <div className='work-style-container'>
            <div id="work-heading">
              <h1>Develop & Deliver</h1>
            </div>
            <p>
              <img src={truck} /> <br></br>
              Throughout development, I navigate the complexities of the process with precision and diligence.
              From conceptualization to deployment, I remain steadfast in my commitment to delivering
              <span data-scroll data-scroll-offset={"40%"} data-scroll-repeat={true} data-scroll-call="changeRed" className="red"> high quality software solutions </span>
              that exceed expectations. With a focus on <span data-scroll data-scroll-offset={"40%"} data-scroll-repeat={true} data-scroll-call="changeRed" className="red"> agility and adaptibility </span>, I ensure that every project is delivered on time and within scope,
              empowering users with innovative solutions that enrich their lives.
            </p>
          </div>
        </div>
      </section>
      <section className="page" id="skills-section">
        <div id="skills-section-heading-wrapper">
          <WordSplit><h1>Crafted Capabilities</h1></WordSplit>
        </div>
        <div id="skills-section-content-wrapper" data-scroll data-scroll-call="letterScrollAnimSped" data-scroll-offset={"20%"}>
          <div className="skill-card">
            <WordSplit animate={true}><h1>React</h1></WordSplit>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="react" />
          </div>
          <div className="skill-card">
            <WordSplit animate={true}><h1>Redux</h1></WordSplit>
            <img src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" alt="react" />
          </div>
          <div className="skill-card">
            <WordSplit animate={true}><h1>HTML</h1></WordSplit>
            <img src="https://cdn-icons-png.flaticon.com/512/732/732212.png" alt="react" />
          </div>
          <div className="skill-card">
            <WordSplit animate={true}><h1>CSS</h1></WordSplit>
            <img src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/css3-512.png" alt="react" />
          </div>
          <div className="skill-card">
            <WordSplit animate={true}><h1>VUE JS</h1></WordSplit>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png" alt="react" />
          </div>
          <div className="skill-card">
            <WordSplit animate={true}><h1>Express JS</h1></WordSplit>
            <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png" alt="react" />
          </div>
          <div className="skill-card">
            <WordSplit animate={true}><h1>Node JS</h1></WordSplit>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png" alt="react" />
          </div>

          <div className="skill-card">
            <WordSplit animate={true}><h1>JQuery</h1></WordSplit>
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-jquery-8-1175153.png" alt="react" />
          </div>


          <div className="skill-card">
            <WordSplit animate={true}><h1>Bootstrap</h1></WordSplit>
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968672.png" alt="react" />
          </div>

          <div className="skill-card">
            <WordSplit animate={true}><h1>Firebase</h1></WordSplit>
            <img src="https://firebase.google.com/static/downloads/brand-guidelines/PNG/logo-logomark.png" alt="react" />
          </div>

          <div className="skill-card">
            <WordSplit animate={true}><h1>Flask</h1></WordSplit>
            <img src="https://static-00.iconduck.com/assets.00/flask-icon-1594x2048-84mjydzf.png" alt="react" />
          </div>
          <div className="skill-card">
            <img src="https://i0.wp.com/blog.knoldus.com/wp-content/uploads/2021/10/django-logo-big-removebg-preview.png?fit=632%2C395&ssl=1" alt="react" />
          </div>

          <div className="skill-card">
            <WordSplit animate={true}><h1>Figma</h1></WordSplit>
            <img src="https://static-00.iconduck.com/assets.00/figma-icon-2048x2048-lvgft610.png" alt="react" />
          </div>


          <div className="skill-card">
            <WordSplit animate={true}><h1>JavaScript</h1></WordSplit>
            <img src="https://static-00.iconduck.com/assets.00/javascript-js-icon-2048x2048-nyxvtvk0.png" alt="react" />
          </div>
          <div className="skill-card">
            <WordSplit animate={true}><h1>TypeScript</h1></WordSplit>
            <img src="data:image/png;base64,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" alt="react" />
          </div>
          <div className="skill-card">
            <WordSplit animate={true}><h1>Python</h1></WordSplit>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png" alt="react" />
          </div>
          <div className="skill-card">
            <WordSplit animate={true}><h1>Java</h1></WordSplit>
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-java-60-1174953.png" alt="react" />
          </div>

          <div className="skill-card">
            <WordSplit animate={true}><h1>MySQL</h1></WordSplit>
            <img src="https://cdn4.iconfinder.com/data/icons/logos-3/181/MySQL-512.png" alt="react" />
          </div>
          <div className="skill-card">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png" alt="react" />
          </div>

          <div className="skill-card">
            <WordSplit animate={true}><h1>Github</h1></WordSplit>
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="react" />
          </div>
          <div className="skill-card">
            <WordSplit animate={true}><h1>Gitlab</h1></WordSplit>
            <img src="https://static-00.iconduck.com/assets.00/gitlab-icon-2048x1885-1o0cwkbx.png" alt="react" />
          </div>
          <div className="skill-card">
            <WordSplit animate={true}><h1>BitBucket</h1></WordSplit>
            <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/44_Bitbucket_logo_logos-512.png" alt="react" />
          </div>

        </div>
      </section>
      <section className="page" id="services-section">
        <div id="services-section-heading">
          <WordSplit><h1>Strengths & Abilities</h1></WordSplit>
        </div>
        <div id="services-section-content-wrapper">
          <div id="services-section-content">
            <p>From conceptualization to implementation, I excel in web development, problem-solving, UI/UX, and creative ideologies. My expertise spans a diverse spectrum, allowing me to craft innovative digital experiences that captivate audiences and drive meaningful engagement.</p>
          </div>
          <div id="services-wrapper" data-scroll data-scroll-offset={"40%"} data-scroll-call="serviceCardAnim">
            <div className="service" onClick={handleServiceClick}>
              <div id="service-heading">
                <h1 className="plus">+</h1>
                <h1 className="first-heading">Web Development</h1>
              </div>
              <div id="service-content">
                <p>Craft robust and dynamic websites and web applications that captivate users and offer seamless functionality. From architecting intuitive user interfaces to implementing scalable backend systems, I ensure your digital platforms are both visually stunning and technologically advanced. Elevate your online presence with websites and applications that exceed expectations, leaving a lasting impression on your audience.
                  <br></br>User Interfaces
                  <br></br>Backend Systems
                  <br></br>Scalable Solutions
                  <br></br>Innovative Development</p>
              </div>
            </div>
            <div className="service" onClick={handleServiceClick}>
              <div id="service-heading">
                <h1 className="plus">+</h1>
                <h1 className="first-heading">Web Development</h1>
              </div>
              <div id="service-content">
                <p>Create websites, web apps, or mobile apps that impress and leave a memorable user experience. From crafting user flows and moodboards to designing web and mobile applications and websites, I will ensure that your digital presence is user-friendly and with precision, backed by a cohesive design system. Your customers are in for an experience they'll rave about.</p>
              </div>
            </div>
            <div className="service" onClick={handleServiceClick}>
              <div id="service-heading">
                <h1 className="plus">+</h1>
                <h1 className="first-heading">Web Development</h1>
              </div>
              <div id="service-content">
                <p>Create websites, web apps, or mobile apps that impress and leave a memorable user experience. From crafting user flows and moodboards to designing web and mobile applications and websites, I will ensure that your digital presence is user-friendly and with precision, backed by a cohesive design system. Your customers are in for an experience they'll rave about.</p>
              </div>
            </div>
            <div className="service" onClick={handleServiceClick}>
              <div id="service-heading">
                <h1 className="plus">+</h1>
                <h1 className="first-heading">Web Development</h1>
              </div>
              <div id="service-content">
                <p>Create websites, web apps, or mobile apps that impress and leave a memorable user experience. From crafting user flows and moodboards to designing web and mobile applications and websites, I will ensure that your digital presence is user-friendly and with precision, backed by a cohesive design system. Your customers are in for an experience they'll rave about.</p>
              </div>
            </div>
          </div>
        </div>
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

  return <div {...(animate ? { 'data-scroll': true } : {})} className={`split-word`}>
    {letters.map((letter, index) => {
      return <span key={index} className="letter">{letter}</span>
    })}
  </div>
}

export default App;

