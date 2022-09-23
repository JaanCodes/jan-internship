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
import { Countdown } from "../UI/Countdown";

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
            <div className="text-center">
              <h2>New Items</h2>
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
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="" data-bs-toggle="tooltip" data-bs-placement="top" title="Creator: Monica Lucas">
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a
                              href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a
                              href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to="">
                        <Skeleton width="100%" height="350px" />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="">
                        <Skeleton width="180px" height="30px" />
                      </Link>
                      <Skeleton width="100px" height="20px" />
                      <Skeleton width="30px" height="15px" />
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
              {newItemsData.map((item) => (
                <div key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate ? (
                      <div className="de_countdown">
                        <Countdown expiryDate={item.expiryDate} />
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a
                              href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a
                              href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.nftId}`}>
                        <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
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

export default NewItems;
