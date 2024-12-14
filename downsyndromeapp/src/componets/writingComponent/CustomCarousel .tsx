import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CustomCarouselCss.css";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

const  CustomCarousel =()=> {
 
  return (
    <div className="container">
      
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 350,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="swiper_container"
      >
        <SwiperSlide>
          <img
            src={
              "https://www.shutterstock.com/image-photo/little-kids-playing-chess-kindergarten-260nw-2198619787.jpg"
            }
            alt="slide_image"
          />
          <h1 className=" text-center text-2xl font-bold">Voices</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9t6xdMJbQRDdQlpMESAH86PyssgY8tfTWhQ&s"
            }
            alt="slide_image"
          />
          <h1 className=" text-center text-2xl font-bold">Draw</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={
              "https://image1.masterfile.com/getImage/NjMyLTAxMTU1MjUyZW4uMDAwMDAwMDA=ANurB5/632-01155252en_Masterfile.jpg"
            }
            alt="slide_image"
          />
          <h1 className=" text-center text-2xl font-bold">Gross Motor Skill</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9t6xdMJbQRDdQlpMESAH86PyssgY8tfTWhQ&s"
            }
            alt="slide_image"
          />
          <h1 className=" text-center text-2xl font-bold">Math Learn</h1>
        </SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            {/* <ion-icon name="arrow-back-outline"></ion-icon> */}
          </div>
          <div className="swiper-button-next slider-arrow">
            {/* * <ion-icon name="arrow-forward-outline"></ion-icon>  */}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default CustomCarousel;
