import { useEffect, useState,useRef } from "react";
import "./posts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  deletePost,
  addPost,
  updatePost,
} from "../../../APIs/postsApis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import UpdatePostModal from "./UpdatePostModal";
import { Link } from "react-router-dom";
import Loader from "../../shared/Loader";

const PostItem = ({ post, onEdit, onDelete }) => (
  <div className="card post-item" key={post.id}>
    <div className="card-body">
      <Link to={`posts/${post.id}`}>
        {post.id} - {post.title}
      </Link>
      <p className="card-text">{post.body}</p>
      <div className="postControlButtons d-flex justify-content-between">
        <button className="btn btn-primary" onClick={() => onEdit(post)}>
          <FontAwesomeIcon icon={faEdit} /> Update
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(post.id)}>
          <FontAwesomeIcon icon={faTrashAlt} /> Delete
        </button>
      </div>
    </div>
  </div>
);

const AddPostForm = ({ newPost, setNewPost, formValid, handleAddPost }) => (
  <div className="add-post-form">
    <input
      type="text"
      className="form-control mb-2"
      placeholder="Title"
      value={newPost.title}
      onChange={(e) =>
        setNewPost((prev) => ({ ...prev, title: e.target.value }))
      }
      required
    />
    {!formValid.FormValid && (
      <p className="text-danger">{formValid.inputValid}</p>
    )}
    <textarea
      className="form-control mb-2"
      placeholder="Body"
      rows="4"
      value={newPost.body}
      onChange={(e) =>
        setNewPost((prev) => ({ ...prev, body: e.target.value }))
      }
      required
    />
    {!formValid.FormValid && (
      <p className="text-danger">{formValid.textareaValid}</p>
    )}
    <button
      className="btn btn-success"
      disabled={!newPost.title.trim() || !newPost.body.trim()}
      onClick={handleAddPost}
    >
      <FontAwesomeIcon icon={faAdd} /> Add Post
    </button>
  </div>
);

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);
  const loading = useSelector((state) => state.postsData.loading);
  const [showModal, setShowModal] = useState(false);
  const [formValid, setFormValid] = useState({
    inputValid: "",
    textareaValid: "",
    FormValid: true,
  });
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [currentPost, setCurrentPost] = useState({ title: "", body: "" });

  const renderAfterCalled = useRef(false);

  useEffect(() => {
      if (!renderAfterCalled.current) {
        dispatch(fetchPosts());
      }
  
      renderAfterCalled.current = true;
  }, []); 
  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId)).finally(() => {
      toast.success("Your post has been deleted successfully");
    });
  };

  const handleAddPost = () => {
    let isValid = true;
    let errors = { inputValid: "", textareaValid: "", FormValid: true };

    if (newPost.title.length < 10 || newPost.title.length > 150) {
      errors.inputValid = "Title should be between 10 and 150 characters.";
      isValid = false;
    }

    if (newPost.body.length < 50 || newPost.body.length > 300) {
      errors.textareaValid = "Body should be between 50 and 300 characters.";
      isValid = false;
    }

    if (!isValid) {
      setFormValid({ ...errors, FormValid: false });
      return;
    }

    dispatch(addPost(newPost)).finally(() => {
      setNewPost({ title: "", body: "" });
      toast.success("Your post has been added successfully");
    });
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = (post) => {
    setCurrentPost(post);
    setShowModal(true);
  };

  const handleUpdatePost = () => {
    const updatedPostData = {
      title: currentPost.title,
      body: currentPost.body,
    };
    dispatch(
      updatePost({ id: currentPost.id, updatedData: updatedPostData })
    ).finally(() => {
      handleCloseModal();
      toast.success("Your post has been updated successfully");
    });
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="posts-container">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                {posts &&
                  posts.map((post) => (
                    <PostItem
                      key={post.id}
                      post={post}
                      onEdit={handleShowModal}
                      onDelete={handleDeletePost}
                    />
                  ))}
              </div>
              <div className="col-lg-4">
                <AddPostForm
                  newPost={newPost}
                  setNewPost={setNewPost}
                  formValid={formValid}
                  handleAddPost={handleAddPost}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <UpdatePostModal
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        currentPost={currentPost}
        handleChangedData={setCurrentPost}
        handleUpdatePost={handleUpdatePost}
      />

      <ToastContainer />
    </>
  );
}

export default Posts;
