import React, { useEffect, useState } from "react";
import ReactLoaing from "react-loading";

import CommonSection from "../../ui/templete/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Table } from "reactstrap";
import LiveList from "../../ui/mainContents/LiveList";
import axios from "axios";

import { FaStar } from "react-icons/fa";

import "./nft-details.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Badge from "react-bootstrap/Badge";

const NftDetails = (props) => {
  const [nftArray, setnftArray] = useState([]);
  const [ownerAddr, setOwnerAddr] = useState("");

  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  // console.log(CreateNFTContract._address);
  console.log(CreateNFTContract);

  const account = useSelector((state) => state.AppState.account);

  // const nftOwner = CreateNFTContract.methods
  //   .UserSelllists()
  //   .call({ from: account }, (error) => {
  //     if (!error) {
  //       console.log("send ok");
  //     } else {
  //       console.log(error);
  //     }
  //   });

  // console.log(nftOwner);

  const [Loading, setLoading] = useState(true);
  const [calldata, setCalldata] = useState(null);

  console.log(calldata);

  const [like, setLike] = useState(0);
  const [view, setView] = useState(0);

  const [likeActive, setLikeActive] = useState(false);
  const [viewActive, setViewActive] = useState(false);

  // const [rating, setRating] = useState(null);
  // const [hover, setHover] = useState(null);

  const stars = Array(5).fill(1);
  const [currentValue, setCurrnetValue] = useState(1);
  const [hoverValue, setHoverValue] = useState(undefined);

  const [rare, setRare] = useState("");
  const [star, setStar] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = (value) => {
    setCurrnetValue(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  useEffect(() => {}, [currentValue]);

  let params = useParams();
  const card_id = params.card_id;

  async function MyAddress(account) {
    if (CreateNFTContract !== null) {
      const MyAddr = await CreateNFTContract.methods.ownerOf(card_id).call();
      console.log(MyAddr);

      setOwnerAddr(MyAddr);
    } else {
      return null;
    }
  }

  useEffect(async () => {
    MyAddress();
  }, []);

  // test
  const sendLike = async () => {
    // const tokenId = 1;
    // const userAdd = "ad1";
    if (likeActive) {
      setLikeActive(false);
      setLike(like - 1);
    } else {
      setLikeActive(true);
      setLike(like + 1);
    }
    await axios
      .post(`http://localhost:5000/nfts`, { id: card_id, account: account })
      .then((res) => {
        console.log(res.data.message);
        setLike(like + 1);
        alert("좋아요 등록 완료");
      });
  };

  const getLike = async () => {
    await axios
      .get(`http://localhost:5000/nfts/like`, {
        tokenId: card_id,
        account: account,
      })
      .then((res) => {
        console.log(res.data);
        alert("liked data 불러오기OK");
      });
  };

  // test

  useEffect(async () => {
    gettokenuri(card_id);
  }, [CreateNFTContract]);

  useEffect(async () => {
    await axios
      .post(`http://localhost:5000/nfts/countoflike`, {
        tokenId: card_id,
      })
      .then((res) => {
        setLike(res.data.count);
      });
  }, []);

  useEffect(async () => {
    await axios
      .post(`http://localhost:5000/nfts/views`, {
        tokenId: card_id,
      })
      .then((res) => {
        console.log(res.data.view);
        setView(res.data.view);
      });
  }, []);

  useEffect(async () => {
    await axios
      .post(`http://localhost:5000/nfts`, {
        tokenId: card_id,
      })
      .then((res) => {
        setRare(res.data.rare);
        setStar(res.data.star);
        setAddress(res.data.address);
        console.log(res.data);
      });
  }, []);

  // function likeBtn() {
  //   if (likeActive) {
  //     setLikeActive(false);
  //     setLike(like - 1);
  //   } else {
  //     setLikeActive(true);
  //     setLike(like + 1);
  //   }
  // }

  function viewBtn() {
    if (viewActive) {
      setViewActive(false);
    } else {
      setViewActive(view + 1);
      setView(view + 1);
    }

    await axios
      .get(`http://localhost:5000/nfts`, { id: card_id, account: account })
      .then((res) => {
        console.log(res.data.message);
        alert("조회수 증가");
      });
  };

  async function gettokenuri(tokenId) {
    const tokenURI = await CreateNFTContract.methods
      .tokenURI(tokenId)
      .call((error) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      });
    await axios.get(tokenURI).then(async (data) => {
      setCalldata(await data.data);
      setLoading(false);
    });
    console.log(tokenURI);
  }

  function testfunc(Loading) {
    if (Loading) {
      return (
        <div>
          <ReactLoaing
            type={"balls"}
            color={"purple"}
            height={667}
            width={375}
          />
        </div>
      );
    } else {
      return (
        <>
          <CommonSection title={calldata.name} />
          <div className="detail__box">
            <Container>
              <Row className="row__box">
                <Col lg="6" md="6" sm="6">
                  {/* 아래 이미지만 들어오도록 */}
                  <img
                    src={calldata.image}
                    alt=""
                    className="single__nft-img"
                    style={{ width: "540px", height: "630px" }}
                  />
                </Col>

                <Col lg="6" md="6" sm="6">
                  <div className="single__nft__content">
                    <h2>{calldata.name}</h2>
                  </div>
                  <div className="owner__address__box">owner : {ownerAddr}</div>

                  <div className="single__nft__icon">
                    <div className="single__nft-seen">
                      <span>
                        <button
                          className="nft-heart__btn"
                          type="submit"
                          onClick={sendLike}
                        >
                          <i className="ri-heart-line"></i> {like}
                        </button>
                      </span>

                      <span>
                        <button className="nft-view__btn" onClick={viewCount}>
                          <i className="ri-eye-line"></i> {view}
                        </button>
                      </span>

                      <span>
                        <Badge
                          pill
                          bg="light"
                          text="dark"
                          className="rare__Badge"
                          style={{ width: "110px", height: "32px" }}
                        >
                          rare : {rare}
                        </Badge>
                      </span>
                    </div>

                    <div className="single__nft-more">
                      <span>
                        <i className="ri-send-plane-line"></i>
                      </span>
                      <span>
                        <i className="ri-more-2-line"></i>
                      </span>
                    </div>
                  </div>
                  <div className="singleNft_price">
                    <p>
                      Price : <span>{calldata.price}</span> ETH
                    </p>
                  </div>

                  <div className="pixel__container">
                    {stars.map((_, i) => {
                      const ratingValue = star;
                      return (
                        <label key={i}>
                          <input
                            type="radio"
                            className="rating"
                            value={ratingValue}
                          />
                          <FaStar
                            className="star"
                            defaultValue={star}
                            key={i}
                            color={
                              (hoverValue || currentValue) > i
                                ? "#ffc107"
                                : "#e4e5e9"
                            }
                            size={20}
                            onChange={() => setCurrnetValue(ratingValue)}
                          />
                        </label>
                      );
                    })}
                  </div>

                  <p className="my-3">Description : {calldata.description}</p>
                  <button className="singleNft-btn">
                    <i className="ri-shopping-bag-line"></i>
                    <Link to="/wallet">Place a Bid</Link>
                  </button>
                  <br />
                  <div className="accordian__box">
                    <div className="tab__tab">
                      <span>History</span>
                      <i className="ri-add-line"></i>
                    </div>
                    {/* <div className={this.state.showInfo ? "show__content" : "content"}> */}
                    <div className="content__text">
                      <Table dark style={{ tableLayout: "fixed" }}>
                        <thead>
                          <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {/* 누구에서 */}
                            <td
                              width="30%"
                              style={{
                                overflow: "hidden",
                                extOverflow: "ellipsis",
                                whiteSpace: "wrap",
                                wordWrap: "break-word",
                              }}
                            >
                              {address}
                            </td>
                            {/* 누구에게 */}
                            <td>address</td>
                            {/* 언제 거래됏는지 날짜*/}
                            <td>2022-00-00</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <LiveList />
        </>
      );
    }
  }

  return (
    <>
      {/* <div>안녕{card_id}</div> */}
      {testfunc(Loading)}
    </>
  );
};

export default NftDetails;
