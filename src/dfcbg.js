<div>
{comments.map((com) => (
  <div key={com._id} style={{ marginBottom: "20px" }}>
    <Button onClick={() => handleToggleCommentBox(com._id)}>
      {visibleReplies[com._id] ? 'Hide Replies' : 'Show Replies'}
    </Button>

    {visibleReplies[com._id] && com.replies && com.replies.length > 0 && (
      <div style={{ marginTop: "10px" }}>
        {com.replies.map((reply) => (
          <Card key={reply._id} style={{ marginBottom: "5px" }}>
            <Container>
              <p>
                <b>Replied by:</b> {reply.user_id.user_name}
              </p>
              <p>
                <b>Replied At:</b> {new Date(reply.createdAt).toLocaleString()}
              </p>
              <p>
                <b>Reply:</b> {reply.reply_msg}
              </p>
            </Container>
          </Card>
        ))}
      </div>
    )}
  </div>
))}
</div>