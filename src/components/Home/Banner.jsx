import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Image imports
import reportImg from "../../assets/images/report.jpg";
import trackImg from "../../assets/images/track.jpg";
import boostImg from "../../assets/images/boost.jpg";

const Banner = () => {
  return (
    <div className="w-full h-[350px] md:h-[450px] lg:h-[450px] rounded-2xl overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full rounded-2xl"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="h-full relative">
            <img
              src={reportImg}
              alt="Report Issues"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Report Issues Easily
              </h1>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="h-full relative">
            <img
              src={trackImg}
              alt="Track Progress"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Track Progress in Real-Time
              </h1>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="h-full relative">
            <img
              src={boostImg}
              alt="Boost Priority"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Boost Priority with Subscription
              </h1>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
