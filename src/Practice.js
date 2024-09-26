{isCommentVisible === item._id && (
  <div>
    {item.comments && item.comments.length > 0 && (
      <div style={{ marginTop: "10px" }}>
        {item.comments.map((com) => (
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
                    <b>Posted by:</b>{" "}
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
                </Container>
              </Card>
              {/* Reply section starts here */}
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
                  {com.replies &&
                    com.replies.length > 0 && (
                      <div style={{ marginTop: "10px" }}>
                        {com.replies.map((reply) => (
                          <Card
                            key={reply._id}
                            style={{ marginBottom: "5px" }}
                          >
                            <Container>
                              <p>
                                <b>Replied by:</b> {}
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
                              </p>
                            </Container>
                          </Card>
                        ))}
                      </div>
                    )}
                </div>
              )}
            </Col>
            <Col lg={1}>
              <Row>
                <Col>
                  <i className="bi bi-suit-heart"></i>
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