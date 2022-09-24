import axios from "axios";
import React, { useEffect, useState } from "react";
import NFT from "../UI/NFT";
import NFTSkeleton from "../UI/NFTSkeleton";

const ExploreItems = () => {
  const [loading, setLoading] = useState(true);
  const [nftsToShow, setNftsToShow] = useState(8);
  const [exploreData, setExploreData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data: response } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
      setExploreData(response);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function filterExplore(filterValue) {
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
      );
      setExploreData(response);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div data-aos="fade-in" data-aos-duration="900">
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => (event.target.value ? filterExplore(event.target.value) : fetchData())}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(nftsToShow).fill(0).map((_, index) => (
            <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              key={index}
              data-aos="fade-in"
              data-aos-duration="900"
            >
              <NFTSkeleton />
            </div>
          ))
        : exploreData.slice(0, nftsToShow).map((nft) => (
            <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              key={nft.id}
              data-aos="fade-in"
              data-aos-duration="900"
            >
              <NFT
                authorId={nft.authorId}
                authorImage={nft.authorImage}
                nftImage={nft.nftImage}
                nftId={nft.nftId}
                title={nft.title}
                price={nft.price}
                likes={nft.likes}
                expiryDate={nft.expiryDate}
              />
            </div>
          ))}

      <div className="col-md-12 text-center" id="loadmore">
        {nftsToShow >= 16 ? (
          ""
        ) : (
          <button id="loadmore" className="btn-main lead" onClick={() => setNftsToShow((prevNumber) => prevNumber + 4)}>
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
