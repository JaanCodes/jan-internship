import axios from "axios";
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import NFT from "../UI/NFT";
import NFTSkeleton from "../UI/NFTSkeleton";

SwiperCore.use([Navigation]);

const NewItems = () => {
  const [loading, setLoading] = useState(true);
  const [newItemsData, setNewItemsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItemsData(response);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="text-center"
              data-aos="fade-in"
              data-aos-easing="ease-in-out"
              data-aos-duration="700"
              data-aos-delay="0"
            >
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div data-aos="fade-in" data-aos-easing="ease-in-out" data-aos-duration="700" data-aos-delay="50">
            {loading ? (
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={4}
                breakpoints={{
                  1: {
                    slidesPerView: 1,
                  },
                  580: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                }}
              >
                {new Array(6).fill(0).map((_, index) => (
                  <SwiperSlide key={index}>
                    <NFTSkeleton />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                nav
                dots={false}
                responsive={{ 0: { items: 1 }, 481: { items: 2 }, 768: { items: 3 }, 1200: { items: 4 } }}
              >
                {newItemsData.map((item) => (
                  <div key={item.id}>
                    <NFT
                      authorId={item.authorId}
                      authorImage={item.authorImage}
                      nftImage={item.nftImage}
                      nftId={item.nftId}
                      title={item.title}
                      price={item.price}
                      likes={item.likes}
                      expiryDate={item.expiryDate}
                    />
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
