import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";

SwiperCore.use([Navigation]);

const HotCollections = () => {
  const [loading, setLoading] = useState(true);
  const [hotCollectionsData, setHotCollectionsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setHotCollectionsData(response);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

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
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="">
                        <Skeleton width="100%" height="200px" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="">
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <Skeleton width="100px" height="20px" />
                      </Link>
                      <br></br>
                      <Skeleton width="60px" height="20px" />
                    </div>
                  </div>
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
              {hotCollectionsData.map((collection) => (
                <div key={collection.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
