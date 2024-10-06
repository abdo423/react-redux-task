import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./posts.css";

function UpdatePostModal({
  handleCloseModal,
  showModal,
  currentPost,
  handleChangedData,
  handleUpdatePost,
}) {
  const [errors, setErrors] = React.useState({ title: "", body: "" });
  const handleModalClose = () => {
    handleCloseModal();
    setErrors({ title: "", body: "" });
  };
  const validate = () => {
    let titleError = "";
    let bodyError = "";

    if (currentPost.title.length < 10 || currentPost.title.length > 150) {
      titleError = "Title should be between 10 and 150 characters.";
    }
    if (currentPost.body.length < 50 || currentPost.body.length > 300) {
      bodyError = "Body should be between 50 and 300 characters.";
    }
    if (titleError || bodyError) {
      setErrors({ title: titleError, body: bodyError });
      return false;
    }

    setErrors({ title: "", body: "" });
    return true;
  };

  const handleUpdate = () => {
    if (validate()) {
      handleUpdatePost();
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentPost.id} - {currentPost.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-post-form">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Title"
              value={currentPost.title}
              onChange={(e) => {
                handleChangedData({ ...currentPost, title: e.target.value });
                setErrors({ title: "", body: "" });
              }}
            />
            {errors.title && <div className="text-danger">{errors.title}</div>}
            <textarea
              className="form-control mb-2"
              placeholder="Body"
              rows="4"
              value={currentPost.body}
              onChange={(e) => {
                handleChangedData({ ...currentPost, body: e.target.value });
                setErrors({ title: "", body: "" });
              }}
            />
            {errors.body && <div className="text-danger">{errors.body}</div>}
          </div>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>

          <Button
            variant="primary"
            disabled={!currentPost.body.trim() || !currentPost.title.trim()}
            onClick={handleUpdate}
          >
            Update Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePostModal;
