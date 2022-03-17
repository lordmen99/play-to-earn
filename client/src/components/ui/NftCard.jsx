import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./nft-card.css";

import Modal from "./Modal";
import NftDetails from "../pages/NftDetails";

const NftCard = (props) => {
  const { title, id, currentBid, creatorImg, imgUrl, creator } = props.item;

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={imgUrl} alt="" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/market/${id}`}>{title}</Link>
        </h5>

        <div className="creator__info-wrapper">
          <div className="creator__img">
            <img src={creatorImg} alt="" />
          </div>
          <div className="creator__info">
            <div className="creator">
              <h6>Created By</h6>
              <p>{creator}</p>
            </div>

            <div className="bid">
              <h6>Current Bid</h6>
              {/* 우리만의 토큰이름을 정해서 아래단위 바꾸기 */}
              <p>{currentBid} ETH</p>
            </div>
          </div>
        </div>

        <div className="bid__box">
          <button className="bid__btn" onClick={() => setShowModal(true)}>
            <i className="ri-shopping-bag-line"></i>
            Place Bid
          </button>

          {showModal && <Modal setShowModal={setShowModal} />}

          <span className="view__link">
            <Link to={`/market/${id}`}>View More</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
