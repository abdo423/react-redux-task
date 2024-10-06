import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostById, fetchPostComments } from "../../../APIs/postsApis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSmile,
  faEllipsisH,
  faCamera,
  faThumbsUp,
  faReply,
  faLanguage,
  faSadCry,
  faAngry,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./PostDetails.module.css";

const PostDetails = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const { post, loading, error, comments } = useSelector(
    (state) => state.postDetails
  );

  useEffect(() => {
    dispatch(fetchPostById(postId));
    dispatch(fetchPostComments(postId));
  }, [dispatch, postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Container className="mt-5 mb-5">
      <Row className="d-flex align-items-center justify-content-center">
        <Col md="8">
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User Avatar"
                  className="rounded-circle mr-2"
                  width="50"
                />
                <div className="m-3">
                  <h6 className="mb-0">{post.title}</h6>
                </div>
              </div>
              <FontAwesomeIcon icon={faEllipsisH} />
            </Card.Header>
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/600x300"
              alt="Post Image"
            />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
              <Button variant="primary">Go Back</Button>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between align-items-center">
              <div>
                <FontAwesomeIcon icon={faHeart} className="m-2 text-danger" />
                <FontAwesomeIcon icon={faSmile} className="m-2 text-warning" />
              </div>
              <div className="text-muted">{comments.length} Comments</div>
            </Card.Footer>
          </Card>

          <div className="comments-section">
            {comments.map((comment) => (
              <Card key={comment.id} className="mb-3">
                <Card.Body>
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Commenter Avatar"
                      className="rounded-circle m-2"
                      width="40"
                    />
                    <div>
                      <h6 className="mb-0">{comment.name}</h6>
                      <small className="text-muted">{comment.email}</small>
                    </div>
                  </div>
                  <p className="mt-2">{comment.body}</p>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="m-2 text-primary"
                      title="Like"
                    />
                    <FontAwesomeIcon
                      icon={faReply}
                      className={`m-2 ${styles.textCool}`}
                      title="Reply"
                    />
                    <FontAwesomeIcon
                      icon={faLanguage}
                      className={`m-2 ${styles.textCustom}`}
                      title="Translate"
                    />
                  </div>
                  <small className="text-muted">20 mins ago</small>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetails;
