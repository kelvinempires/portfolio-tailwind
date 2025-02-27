import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Portfolio = () => {
  useEffect(() => {
    const initSlider = () => {
      const imageList = document.querySelector(".slider-wrapper .image-list");
      const slideButtons = document.querySelectorAll(
        ".slider-wrapper .slide-button"
      );
      const sliderScrollbar = document.querySelector(
        ".container .slider-scrollbar"
      );
      const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
      const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

      // Handle scrollbar thumb drag
      scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition =
          sliderScrollbar.getBoundingClientRect().width -
          scrollbarThumb.offsetWidth;

        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX;
          const newThumbPosition = thumbPosition + deltaX;

          // Ensure the scrollbar thumb stays within bounds
          const boundedPosition = Math.max(
            0,
            Math.min(maxThumbPosition, newThumbPosition)
          );
          const scrollPosition =
            (boundedPosition / maxThumbPosition) * maxScrollLeft;

          scrollbarThumb.style.left = `${boundedPosition}px`;
          imageList.scrollLeft = scrollPosition;
        };

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      });

      // Slide images according to the slide button clicks
      slideButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = imageList.clientWidth * direction;
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
      });

      // Show or hide slide buttons based on scroll position
      const handleSlideButtons = () => {
        slideButtons[0].style.display =
          imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display =
          imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
      };

      // Update scrollbar thumb position based on image scroll
      const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition =
          (scrollPosition / maxScrollLeft) *
          (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
      };

      // Call these two functions when image list scrolls
      imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
      });
    };

    window.addEventListener("resize", initSlider);
    window.addEventListener("load", initSlider);
    initSlider(); // Initialize slider on component mount

    return () => {
      window.removeEventListener("resize", initSlider);
      window.removeEventListener("load", initSlider);
    };
  }, []);

  return (
    <main>
      <div className="border-b-2">
        <h1 className="flex justify-center font-serif text-3xl/8 py-10 font-bold">
          Discover + 40 projects that I made with ❤️
        </h1>
      </div>
      <div className="flex flex-col text-center sm:flex-row md:gap-10 justify-center pt-8 font-bold">
        <p className="bg-black text-white px-4">ALL PROJECTS</p>
        <p>WEB/MOBILE DEVELOPMENT</p>
        <p>UI/UX DESIGN</p>
        <p>BRANDING</p>
      </div>
      <div className="container">
        <div className="slider-wrapper">
          <button
            id="prev-slide"
            className="slide-button material-symbols-rounded"
            aria-label="Previous Slide"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <ul className="image-list">
            <li className="image-item">
              <div className="bg-gray-300 hover:bg-gray-400 text-center">
                <p className="text-xs font-semibold pt-10 text-orange-500">
                  Web Development
                </p>
                <h1 className="px-5 pb-5 font-semibold">
                  Bringing the Kelvin Empire <br />
                  to Western Africa
                </h1>
                <a
                  target="_blank"
                  referrerPolicy="no-referrer"
                  href="https://kelvinempires.github.io/shoppingCart/"
                >
                  <video
                    className="h-36 w-96 px-5 hover:h-36 hover:w-105 hover:px-2 transition-all duration-500"
                    src="./image/cart video.mp4"
                    height="300"
                    width="300"
                    autoPlay
                    loop
                  ></video>
                </a>
              </div>
              <div className="h-16 bg-gray-300 hover:bg-gray-400 mt-4 rounded shadow-md"></div>
            </li>
            <li className="image-item">
              <div className="bg-gray-300 hover:bg-gray-400 text-center">
                <p className="text-blue-400 text-xs font-semibold pt-10">
                  Web Development
                </p>
                <h1 className="font-semibold px-5 pb-5">
                  Realize Your Dream and
                  <br />
                  Build Your New World
                </h1>
                <a href="../bostrap/index.html">
                  <img
                    className="h-36 w-96 px-5 hover:h-36 hover:w-105 hover:px-2 transition-all duration-500"
                    src="./image/Screenshot 2024-09-22 082523.png"
                    alt="Project Screenshot"
                  />
                </a>
              </div>
              <div className="h-16 bg-gray-300 hover:bg-gray-400 mt-4 rounded shadow-md"></div>
            </li>
          </ul>
          <button
            id="next-slide"
            className="slide-button material-symbols-rounded"
            aria-label="Next Slide"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
        <div className="slider-scrollbar">
          <div className="scrollbar-track">
            <div className="scrollbar-thumb"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
