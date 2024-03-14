function loco() {
    gsap.registerPlugin(ScrollTrigger);
  
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  }
loco();

var tl = gsap.timeline();
tl.from("#nav img, #nav ul li, #nav button, #nav input, #nav i", {
    y: -100,
    duration: 0.7,
    delay: 0.5,
    opacity: 0,
    stagger: 0.5
})
tl.from("#page1-cont h2, #page1-cont h1, #page1-cont h3, #page1-cont h5", {
    y:100,
    duration: 1,
    opacity: 0,
    stagger: 0.5
})
tl.from("#page2-cont h2, #page2-cont h1, #page2-cont h3", {
    y:100,
    duration: 1,
    opacity: 0,
    stagger: 0.5
})
tl.from("#page2-img1, #page2-img2, #page2-img3", {
    scale: 0,
    opacity: 0,
    stagger: 0.7
})
