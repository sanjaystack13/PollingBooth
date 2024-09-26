import { Bs9Square } from "react-icons/bs";
import profile from "./Images/png-transparent-user-profile-computer-icons-login-user-avatars.png";
import React, { useDeferredValue, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormControl,
  Row,
} from "react-bootstrap";
import "./Homepagee.css";
import axios from "axios";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Createdat from "./Createdat";
import Swal from "sweetalert2";
import ExpiryAt from "./ExpiryAt";
const HomePage = ({ createdpolls }) => {
  console.log(createdpolls);
  const addnav = useNavigate();
  // const location = useLocation();
  const location = useLocation();
  console.log(location?.state?.x);
  const [showdata,setShowdata] = useState()
  const [state, setState] = useState(false);
  const [followed, setFollowed] = useState();
  // const [remainingTime, setRemainingTime] = useState({});
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [trendingpolls, setTrendingpolls] = useState({});
  const [likescount, setLikescount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [reply, setReply] = useState();
  const [likeComments, setLikeComments] = useState();
  const [voteoption, setVoteoption] = useState({
    poll_id: "",
    user_id: "",
    option: "",
  });
  const [gliked, setGliked] = useState([]);
  const [like, setLike] = useState({
    poll_id: "",
    user_id: "",
  });
  const [sended, setSended] = useState(false);
  const [local, setLocal] = useState(false);
  const [fetchComments, setFetchComments] = useState([]);
  const [commentsliked, setCommentsliked] = useState([]);
  const [replyliked, setReplyliked] = useState([]);
  const [commenttype, setCommenttype] = useState();
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [replyingToComment, setReplyingToComment] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replytoreply, setReplytoreply] = useState("");
  const [replytoreplycomment, setReplytoreplycomment] = useState(null);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [replyToReplyVisible, setReplyToReplyVisible] = useState({});
  const [replyingUser, setReplyingUser] = useState("");
  const navProf = useNavigate();
  useEffect(() => {
    const getUser = () => {
      const userData = sessionStorage.getItem("UserData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setCurrentUser(parsedUserData._id);
      }
    };
    getUser();
  }, []);
  useEffect(() => {
    if (location.state !== undefined) {
      let a = location?.state?.x;
      console.log("112", location?.state?.x);

      setData(a);
      console.log(a);
      setState(true);
    }
  }, [location.state]);
  useEffect(() => {
    const fetchData = async () => {
      if (state && location?.state?.x) {
        console.log("entered  1");

        try {
          const response = await axios.post(
            "http://localhost:5000/polls/multipoll",
            {
              poll_ids: location.state.x,
              user_id: currentUser,
            }
          );
          if (response.data) {
            setData(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      } 
      else if (location?.state?.poll) {
        if (location?.state?.poll) {
          const fetchTrending = async () => {
            try {
              const response = await axios.post("http://localhost:5000/polls/getone", {
                poll_id: location?.state?.poll?._id,
                user_id: currentUser,
              });
        
              console.log("Response data:", response.data); 
        
              if (response.status === 200) {
                const responseData = response.data;
        
                if (Array.isArray(responseData)) {
                  setData(responseData);
                } else {
                  setData([responseData]); 
                }
              }
            } catch (error) {
              console.log("Error fetching poll data:", error);
            }
          };
      
          fetchTrending();
        }
      } 
      else if (location?.state?.search) {
        const fetchsearch = async () => {
          const response = await axios.post(
            "http://localhost:5000/polls/search",
            {
              query: location.state.search,
            }
          );
          const storeSearch = response?.data?.poll_ids;
          if (storeSearch) {
            const response = await axios.post(
              "http://localhost:5000/polls/multipoll",
              {
                poll_ids: storeSearch,
                user_id: currentUser,
              }
            );
            if (response.status === 200) {
              setData(response.data);
              console.log("error");
            }
          }
        };
        fetchsearch();
      } else if (createdpolls) {
        console.log("entered   2");
        try {
          const response = await axios.post(
            "http://localhost:5000/polls/multipoll",
            {
              poll_ids: createdpolls,
              user_id: currentUser,
            }
          );
          if (response.data) {
            setData(response.data);
          }
        } catch (error) {}
      } else {
        console.log("entered   3");

        try {
          // Use Promise.all to run both requests in parallel
          const [followedResponse, allPollsResponse] = await Promise.all([
            axios.post("http://localhost:5000/polls/getisfollowing", {
              user_id: currentUser,
            }),
            axios.post("http://localhost:5000/polls/getall", {
              user_id: currentUser,
            }),
          ]);

          // Extract data from responses
          const countFollow = followedResponse.data.pollIds;
          const allPolls = allPollsResponse.data;

          // Update state
          if (countFollow) {
            setFollowed(countFollow);
          } else {
            console.error("Error: No poll IDs received");
          }

          if (allPolls) {
            setData(allPolls);
          } else {
            console.error("Error: No data received");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [location?.state?.search,location.state,location?.state?.poll,createdpolls,currentUser,voteoption,]);

  useEffect(() => {
    const fetchreplylikes = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/comment/getreplieslikedbyuser",
          {
            user_id: currentUser,
          }
        );
        const replylikes = response.data.replyIds;
        if (replylikes) {
          setReplyliked(replylikes);
        }
      } catch (error) {
        console.error("Error fetching reply likes:", error);
      }
    };

    fetchreplylikes();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const likesCount = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/polls/getliked",
            {
              user_id: currentUser,
            }
          );
          const licount = response.data.pollIds;
          if (licount) {
            setGliked(licount);
          }
        } catch (error) {
          console.error("Error fetching polls:", error);
        }
      };
      likesCount();
    }
  }, [currentUser]);
  useEffect(() => {
    if (currentUser) {
      const fetchLikedComments = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/comment/getcommentslikedbyuser",
            {
              user_id: currentUser,
            }
          );

          if (response.data && response.data.commentIds) {
            setCommentsliked(response.data.commentIds);
          }
        } catch (error) {
          console.error("Error", error.message);
        }
      };
      fetchLikedComments();
    }
  }, [currentUser]);
  useEffect(() => {
    if (currentUser) {
      const followedcount = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/polls/getisfollowing",
            { user_id: currentUser }
          );
          const countfollow = response.data.pollIds;
          if (countfollow) {
            setFollowed(countfollow);
          } else {
            console.error("Error: No poll IDs received");
          }
        } catch (error) {
          console.error("Error fetching followed polls:", error);
        }
      };

      followedcount();
    }
  }, [local]);
  const handleOption = (pollId, option) => {
    if (
      selectedOption &&
      selectedOption._id === pollId &&
      selectedOption.option === option
    ) {
      setSelectedOption(null);
    } else {
      setSelectedOption({ _id: pollId, option });
      setVoteoption({
        poll_id: pollId,
        user_id: currentUser,
        option: option,
      });
    }
  };
  const Votebutton = async () => {
    if (voteoption.poll_id && voteoption.user_id && voteoption.option) {
      const response = await axios.post(
        "http://localhost:5000/polls/voteonpoll",
        voteoption
      );
      if (response.status === 200) {
        setSended(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your vote has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        {
          setVoteoption({
            poll_id: "",
            user_id: "",
            option: "",
          });
        }
        setSelectedOption(null);
      } else if (response.status === 200) {
        setSended(false);
      }
    }
  };
  const handleunvote = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/polls/getoption",
        {
          poll_id: id,
          user_id: currentUser,
        }
      );
      let option = response.data.votedOption;
      if (option) {
        const unvote = await axios.post(
          "http://localhost:5000/polls/voteonpoll",
          {
            poll_id: id,
            user_id: currentUser,
            option: option,
          }
        );
        if (unvote.status === 201) {
          setSended(true);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Your vote has removed",
            showConfirmButton: false,
            timer: 1500,
          });
          setVoteoption({
            poll_id: "",
            user_id: "",
            option: "",
          });
        } else if (unvote.status === 200) {
          setSended(false);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Your vote has removed",
            showConfirmButton: false,
            timer: 1500,
          });
          setVoteoption({
            poll_id: "",
            user_id: "",
            option: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = async (id) => {
    if (id && currentUser) {
      await axios.post("http://localhost:5000/polls/likeonpoll", {
        poll_id: id,
        user_id: currentUser,
      });
      setGliked((prevGliked) => {
        if (prevGliked.includes(id)) {
          return prevGliked.filter((pollId) => pollId !== id);
        } else {
          return [...prevGliked, id];
        }
      });
      setData((prevData) =>
        prevData.map((poll) =>
          poll._id === id
            ? {
                ...poll,
                likers: gliked.includes(id)
                  ? poll.likers.filter((temp) => temp._id !== currentUser)
                  : [...poll.likers, { _id: currentUser }],
              }
            : poll
        )
      );
    }
  };
  const handleLikeReplies = async (commentid, replyid) => {
    if (currentUser) {
      try {
        const response = await axios.post(
          "http://localhost:5000/comment/likereply",
          {
            user_id: currentUser,
            comment_id: commentid,
            reply_id: replyid,
          }
        );
        if (response.status === 200) {
          setReplyliked((prev) => {
            const isReplyLiked = prev.includes(replyid);
            if (isReplyLiked) {
              return prev.filter((id) => id !== replyid);
            } else {
              return [...prev, replyid];
            }
          });
          setData((prevData) =>
            prevData.map((poll) => ({
              ...poll,
              comments: poll.comments.map((comment) =>
                comment.id === commentid
                  ? {
                      ...comment,
                      replies: comment.replies.map((replyy) =>
                        replyy.id === replyid
                          ? {
                              ...replyy,
                              likers: replyliked.includes(replyid)
                                ? replyy.likers.filter(
                                    (liker) => liker._id !== currentUser
                                  )
                                : [...replyy.likers, { _id: currentUser }],
                            }
                          : replyy
                      ),
                    }
                  : comment
              ),
            }))
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const handleLikeComments = async (commentId) => {
    if (currentUser) {
      try {
        const response = await axios.post(
          "http://localhost:5000/comment/likecomment",
          {
            user_id: currentUser,
            comment_id: commentId,
          }
        );
        if (response.status === 200) {
          setCommentsliked((prevLiked) => {
            const isLiked = prevLiked.includes(commentId);
            if (isLiked) {
              return prevLiked.filter((id) => id !== commentId);
            } else {
              return [...prevLiked, commentId];
            }
          });

          setData((prevData) =>
            prevData.map((poll) => ({
              ...poll,
              comments: poll.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      likers: commentsliked.includes(commentId)
                        ? comment.likers.filter((liker) => liker._id !== currentUser
                          )
                        : [...comment.likers, { _id: currentUser }],
                    }
                  : comment
              ),
            }))
          );
        }
      } catch (error) {
        console.error("Error liking comment:", error.message);
      }
    }
  };
  const handleToggleReplyBox = (commentId) => {
    setVisibleReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };
  const handleToggleReplyToReply = (commentId, replyToUser) => {
    setReplyToReplyVisible((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
    setReplyingUser(replyToUser);
  };
  const handleToggleCommentBox = async (id) => {
    if (currentUser) {
      const response = await axios.post(
        "http://localhost:5000/comment/getbyid",
        {
          poll_id: id,
          user_id: currentUser,
        }
      );
      setIsCommentVisible((prev) => (prev === id ? null : id));
      setFetchComments(response.data);
    } else {
      const response = await axios.post("http://localhost:5000/polls/getall", {
        user_id: currentUser,
      });
      setIsCommentVisible((prev) => (prev === id ? null : id));
      setFetchComments(response.data);
    }
  };
  const handlecomment = async (id) => {
    if (id && currentUser) {
      const comentresp = await axios.post(
        "http://localhost:5000/comment/createcomment",
        {
          poll_id: id,
          user_id: currentUser,
          comment: commenttype,
        }
      );
      setIsCommentVisible(null);
      setCommenttype("");
    }
  };
  const handleDelete = async (id) => {
    if (id && currentUser) {
      try {
        // Show confirmation dialog before sending the delete request
        const result = await Swal.fire({
          title: "Do you want to delete this poll?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Delete",
          denyButtonText: `Don't delete`,
        });

        if (result.isConfirmed) {
          // Send the delete request if confirmed
          const response = await axios.post(
            "http://localhost:5000/polls/delete",
            {
              poll_id: id,
            }
          );

          if (response.status === 200) {
            console.log("Poll deleted successfully");
            Swal.fire("Deleted!", "", "success");

            // Update state to remove deleted poll
            setData((prevData) => prevData.filter((poll) => poll._id !== id));
          } else {
            // Handle unexpected response status
            Swal.fire("Error", "Failed to delete poll", "error");
          }
        } else if (result.isDenied) {
          Swal.fire("Poll not deleted", "", "info");
        }
      } catch (error) {
        // Log or handle error appropriately
        console.error("Error deleting poll:", error);
        Swal.fire(
          "Error",
          "An error occurred while deleting the poll",
          "error"
        );
      }
    }
  };
  const handleEdit = (item) => {
    console.log(item);
    addnav("/Addpoll", { state: { item } });
  };
  const handleFollowers = async (id) => {
    console.log("entered");
    if (currentUser && id) {
      try {
        const response = await axios.post("http://localhost:5000/api/follow", {
          follow_user_id: id,
          user_id: currentUser,
        });
        setFollowed((prevFollow) => {
          if (prevFollow.includes(id)) {
            return prevFollow.filter((pollId) => pollId !== id);
          } else {
            return [...prevFollow, id];
          }
        });
        setLocal(!local);
      } catch (err) {
        console.error("Error follow:", err);
      }
    }
  };
  const handleReplies = async (id, c_id) => {
    if (currentUser && replyText) {
      console.log(replyText);
      try {
        await axios.post("http://localhost:5000/comment/replycomment", {
          poll_id: id,
          user_id: currentUser,
          reply_msg: replyText,
          comment_id: c_id,
        });
        setReplyText("");
        setReplyingToComment(null);
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    }
  };
  const handleClickReplytoRepy = async (id, c_id) => {
    if (currentUser && replytoreply) {
      try {
        await axios.post("http://localhost:5000/comment/replycomment", {
          poll_id: id,
          user_id: currentUser,
          reply_msg: `@${replyingUser} : ${replytoreply}`,
          comment_id: c_id,
        });
        setReplytoreply("");
        setReplytoreplycomment(null);
      } catch (error) {
        console.error("Error submitting reply", error);
      }
    }
  };
  const handleProfilePageNavigation = (userId) => {
    // navProf(`/ProfilePage/${userId}`);
    navProf("/ProfilePage", { state: { userId } });
  };
  console.log("follwed", followed);
  return (
    <div className="homepagebody">
      <Container fluid style={{ height: "auto", background: "white" }}>
        <Row>
          <Col
            style={{ background: "transparent" }}
            xs={12}
            md={12}
            xl={12}
            lg={12}
          >
            {data?.map((item) => {
              const totalVotes = item.options.reduce(
                (total, option) => total + option.count,
                0
              );
              return (
                <Card
                  className="cardhomepage"
                  style={{ background: "transparent" }}
                  key={item._id}
                >
                  <Container>
                    <Row style={{ color: "white" }}>
                      <Col lg={10}>
                        <div style={{ display: "flex" }}>
                          <img
                            className="profileforhome"
                            src={`http://localhost:5000${item.createdBy.user_profile}`}
                          ></img>
                          <h2 style={{ paddingLeft: "20px", color: "black" }}>
                            <a
                              style={{ textDecoration: "none", color: "black" }}
                              href=""
                              onClick={() =>
                                handleProfilePageNavigation(item.createdBy._id)
                              }
                            >
                              {item.createdBy.user_name}
                            </a>
                          </h2>
                          <div
                            style={{
                              display:
                                currentUser == item.createdBy._id
                                  ? "none"
                                  : "contents",
                            }}
                          >
                            <Button
                              className="buttonfollow"
                              onClick={() =>
                                handleFollowers(item.createdBy._id)
                              }
                            >
                              {followed?.includes(item?._id)
                                ? "Unfollow"
                                : "Follow"}
                            </Button>
                          </div>
                          <div
                            style={{
                              display:
                                currentUser === item.createdBy._id
                                  ? "contents"
                                  : "none",
                            }}
                          >
                            <i
                              class="bi bi-trash3-fill delete"
                              onClick={() => handleDelete(item._id)}
                            ></i>
                            <i
                              class="bi bi-pencil-square edit "
                              onClick={() => handleEdit(item)}
                            ></i>
                            <br />
                          </div>
                        </div>
                        <br />
                        <div style={{ display: "flex", color: "black" }}>
                          <i
                            style={{ paddingRight: "10px" }}
                            class="bi bi-stopwatch-fill"
                          ></i>
                          <h5 style={{ paddingRight: "10px" }}>
                            {" "}
                            Poll Created at:{" "}
                          </h5>
                          <div style={{ paddingbottom: "30px" }}>
                            <Card>
                              {" "}
                              {<Createdat createdtime={item?.createdAt} />}
                            </Card>{" "}
                          </div>
                        </div>
                        <hr />
                        <div style={{ display: "flex", color: "red" }}>
                          <>
                            <i
                              style={{ paddingRight: "10px", color: "black" }}
                              class="bi bi-stopwatch-fill"
                            ></i>
                            <h5 style={{ paddingRight: "10px" }}>
                              Poll Ends in:
                            </h5>
                            <Card>
                              {" "}
                              {<ExpiryAt expiryTime={item?.expirationTime} />}
                            </Card>
                          </>
                        </div>
                        <br />
                      </Col>
                      <Col lg={1}></Col>
                      <Col lg={1}></Col>
                    </Row>
                  </Container>
                  <Card className="cardquestion">
                    <h6 style={{ color: "black" }}>Question:</h6>
                    <h6> {item.question}??</h6>
                  </Card>
                  <br />
                  <div
                    style={{
                      display: item.createdBy.isVoted ? "block" : "none",
                    }}
                    className="vote-bar"
                  >
                    {item.options.map((opti) => {
                      const percentage =
                        totalVotes > 0 ? (opti.count / totalVotes) * 100 : 0;
                      return (
                        <div key={opti._id} className="bar-container">
                          <label>{opti.option}</label>
                          <div className="bar">
                            <div
                              className="filled-bar"
                              style={{
                                width: `${percentage}%`,
                              }}
                            >
                              <span className="percentage-text">
                                {percentage.toFixed()}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* <h6>Options:</h6> */}
                  <div
                    style={{
                      display: item.createdBy.isVoted ? "none" : "block",
                    }}
                    className="vote-options"
                  >
                    <Card className="cardoptions">
                      {item.options.map((opti, ind) => (
                        <div
                          key={opti._id}
                          onClick={() => handleOption(item._id, opti.option)}
                        >
                          <input
                            style={{
                              marginRight: "20px",
                              marginBottom: "20px",
                              backgroundColor: "black",
                            }}
                            type="radio"
                            name={`option-${opti._id}`}
                            checked={
                              selectedOption &&
                              selectedOption._id === item._id &&
                              selectedOption.option === opti.option
                            }
                          />
                          <label>{opti.option}</label>
                        </div>
                      ))}
                    </Card>
                  </div>
                  <br />
                  {item.category.map((cate, ind) => (
                    <div>
                      <Button className="buttonCategory">
                        {cate.category_name}
                      </Button>
                    </div>
                  ))}
                  <br />
                  {item.createdBy.isVoted ? (
                    <button
                      className="vote-button unvote"
                      onClick={() => handleunvote(item._id)}
                    >
                      Unvote
                    </button>
                  ) : (
                    <button
                      className="vote-button vote"
                      onClick={() => Votebutton(item._id)}
                    >
                      Vote
                    </button>
                  )}
                  <br />
                  <Row style={{ color: "black" }}>
                    <Col lg={3} style={{ borderRight: "1px solid grey" }}>
                      <i
                        className={
                          gliked.includes(item._id)
                            ? "bi bi-heart-fill"
                            : "bi bi-heart"
                        }
                        style={{
                          color: gliked.includes(item._id) ? "red" : "inherit",
                          cursor: "pointer",
                          paddingRight: "5px",
                        }}
                        onClick={() => handleLike(item._id)}
                      >
                        {item.likers.length} likes
                      </i>
                    </Col>
                    <Col
                      lg={3}
                      style={{ borderRight: "1px solid grey", color: "black" }}
                    >
                      <i class="bi bi-person">{item.voters.length}Voters</i>
                    </Col>
                    <Col lg={3} style={{ borderRight: "1px solid grey" }}>
                      <i
                        class="bi bi-chat"
                        onClick={() => handleToggleCommentBox(item._id)}
                      >
                        Comments
                      </i>
                    </Col>
                    <Col
                      lg={3}
                      style={{ borderRight: "1px solid grey", color: "black" }}
                    >
                      <i class="bi bi-share">Share</i>
                    </Col>
                  </Row>
                  <Container>
                    {isCommentVisible === item._id && (
                      <div>
                        {fetchComments && fetchComments.length > 0 && (
                          <div style={{ marginTop: "10px" }}>
                            {fetchComments.map((com) => (
                              <Row
                                key={com._id}
                                style={{ marginBottom: "10px" }}
                              >
                                <Col lg={2}>
                                  <i className="personicon bi bi-person"></i>
                                </Col>
                                <Col lg={9}>
                                  <Card className="Commentcard">
                                    <Container style={{ marginBottom: "5px" }}>
                                      <p>
                                        <b>Posted by:</b>
                                        {com.user_id.user_name}
                                      </p>
                                      <p>
                                        <b>Posted At:</b>{" "}
                                        {new Date(
                                          com.created_at
                                        ).toLocaleString()}
                                      </p>
                                      <p>
                                        <b>Comment:</b> {com.comment}
                                      </p>
                                      <Button
                                        onClick={() =>
                                          handleToggleReplyBox(com._id)
                                        }
                                      >
                                        {visibleReplies[com._id]
                                          ? "Hide Replies"
                                          : "Show Replies"}
                                      </Button>
                                      {visibleReplies[com._id] &&
                                        com.replies &&
                                        com.replies.length > 0 && (
                                          <div style={{ marginTop: "10px" }}>
                                            {com.replies.map((reply) => (
                                              <Card
                                                key={reply._id}
                                                style={{ marginBottom: "5px" }}
                                              >
                                                <i className="personicon bi bi-person"></i>
                                                <Container>
                                                  <p>
                                                    <b>Replied by:</b>{" "}
                                                    {reply.user_id.user_name}
                                                  </p>
                                                  <p>
                                                    <b>Replied At:</b>{" "}
                                                    {new Date(
                                                      reply.createdAt
                                                    ).toLocaleString()}
                                                  </p>
                                                  <p>
                                                    <b>Reply:</b>{" "}
                                                    {reply.reply_msg}
                                                    <br />
                                                    <i
                                                      className={`bi ${
                                                        replyToReplyVisible[
                                                          com._id
                                                        ]
                                                          ? "bi-reply-all-fill"
                                                          : "bi-reply-all-fill"
                                                      }`}
                                                      onClick={() =>
                                                        handleToggleReplyToReply(
                                                          com?._id,
                                                          reply?.user_id
                                                            ?.user_name
                                                        )
                                                      }
                                                    ></i>
                                                    <i
                                                      class="bi bi-heart"
                                                      className={
                                                        replyliked.includes(
                                                          reply._id
                                                        )
                                                          ? "bi bi-heart-fill"
                                                          : "bi bi-heart"
                                                      }
                                                      style={{
                                                        color:
                                                          commentsliked.includes(
                                                            com._id
                                                          )
                                                            ? "red"
                                                            : "inherit",
                                                      }}
                                                      onClick={() =>
                                                        handleLikeReplies(
                                                          com._id,
                                                          reply._id
                                                        )
                                                      }
                                                    >
                                                      {reply.likers.length}
                                                    </i>
                                                  </p>
                                                </Container>
                                              </Card>
                                            ))}
                                            {replyToReplyVisible[com?._id] && (
                                              <>
                                                <textarea
                                                  value={replytoreply}
                                                  onChange={(e) =>
                                                    setReplytoreply(
                                                      e.target.value
                                                    )
                                                  }
                                                  placeholder="Write your Reply here..."
                                                  rows="4"
                                                  style={{
                                                    width: "100%",
                                                    marginTop: "10px",
                                                    marginBottom: "10px",
                                                  }}
                                                />
                                                <Button
                                                  onClick={() =>
                                                    handleClickReplytoRepy(
                                                      item?._id,
                                                      com?._id
                                                    )
                                                  }
                                                  style={{
                                                    display: "block",
                                                    marginTop: "10px",
                                                  }}
                                                >
                                                  Submit Reply
                                                </Button>
                                              </>
                                            )}
                                          </div>
                                        )}
                                    </Container>
                                  </Card>
                                  {replyingToComment === com._id && (
                                    <div style={{ marginTop: "10px" }}>
                                      <textarea
                                        value={replyText}
                                        onChange={(e) =>
                                          setReplyText(e.target.value)
                                        }
                                        placeholder="Reply here"
                                        rows="4"
                                        style={{
                                          width: "100%",
                                          marginBottom: "10px",
                                        }}
                                      />

                                      <Button
                                        onClick={() =>
                                          handleReplies(item._id, com._id)
                                        }
                                        style={{
                                          display: "block",
                                          marginBottom: "10px",
                                        }}
                                      >
                                        Submit Reply
                                      </Button>
                                    </div>
                                  )}
                                </Col>
                                <Col lg={1}>
                                  <Row>
                                    <Col>
                                      <i
                                        className={
                                          commentsliked.includes(com._id)
                                            ? "bi bi-heart-fill"
                                            : "bi bi-heart"
                                        }
                                        style={{
                                          color: commentsliked.includes(com._id)
                                            ? "red"
                                            : "inherit",
                                        }}
                                        onClick={() =>
                                          handleLikeComments(com._id)
                                        }
                                      >
                                        {com.likers.length}
                                      </i>
                                    </Col>
                                    <br />
                                    <br />
                                    <Col>
                                      <i
                                        className="bi bi-reply-fill"
                                        onClick={() =>
                                          setReplyingToComment(com._id)
                                        }
                                      ></i>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            ))}
                          </div>
                        )}
                        <textarea
                          value={commenttype}
                          onChange={(e) => setCommenttype(e.target.value)}
                          placeholder="Write your comment here..."
                          rows="4"
                          style={{
                            width: "100%",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        />
                        <Button
                          onClick={() => handlecomment(item._id)}
                          style={{ display: "block", marginTop: "10px" }}
                        >
                          Submit Comment
                        </Button>
                      </div>
                    )}
                  </Container>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default HomePage;
