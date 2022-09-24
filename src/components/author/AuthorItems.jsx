import NFT from "../UI/NFT";
import NFTSkeleton from "../UI/NFTSkeleton";

const AuthorItems = ({ authorData, loading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <NFTSkeleton />
                </div>
              ))
            : authorData.nftCollection?.map((nft) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={nft.id}
                  data-aos="fade-in"
                  data-aos-duration="400"
                >
                  <NFT
                    authorId={""}
                    authorImage={authorData.authorImage}
                    nftImage={nft.nftImage}
                    nftId={nft.nftId}
                    title={nft.title}
                    price={nft.price}
                    likes={nft.likes}
                    expiryDate={nft.expiryDate}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
