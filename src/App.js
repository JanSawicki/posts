import "./App.css";
import { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import List from "@material-ui/core/List";

import PostListItemComponent from "./PostListItemComponent";
import PostEditDialogComponent from "./PostEditDialogComponent";

function App() {
  const [posts, setPosts] = useState();
  const [page, setPage] = useState(1);
  const [postsCount, setPostsCount] = useState();
  const [currentPost, setCurrentPost] = useState({});
  const [limit, setLimit] = useState(3);
  const [open, setOpen] = useState(false);

  let changePage = (page, limit) => {
    setPage(page);
    fetch(`/api/posts/?limit=${limit}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => console.log("Not found", error));
  };

  useEffect(() => {
    fetch(`/api/posts/count`)
      .then((res) => res.json())
      .then((data) => {
        setPostsCount(Math.ceil(data / limit));
      })
      .catch((error) => console.log("Not found", error));

    changePage(1, limit);
  }, [limit]);

  const handlePageChange = (event, value) => {
    changePage(value, limit);
  };

  const handleChangeLimit = (event, value) => {
    setLimit(value);
    changePage(value, limit);
  };

  const handleCurrentPostTitleChange = (event) => {
    let _currentPost = currentPost;
    _currentPost.title = event.target.value;
    setCurrentPost(_currentPost);
  };

  const handleCurrentPostBodyChange = (event) => {
    let _currentPost = currentPost;
    _currentPost.body = event.target.value;
    setCurrentPost(_currentPost);
  };

  const handleClose = (isSaved) => {
    if (isSaved) {
      let id = currentPost.id;

      fetch(`/api/posts/${id}`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(currentPost),
      }).then((response) => {
        changePage(page, limit);
      });
    }
    setOpen(false);
  };

  return (
    <div className="center">
      <List dense={true}>
        {posts &&
          posts.map((post) => {
            return (
              <PostListItemComponent
                post={post}
                setCurrentPost={setCurrentPost}
                setOpen={setOpen}
              />
            );
          })}
      </List>
      <Pagination
        count={postsCount}
        showFirstButton
        showLastButton
        onChange={handlePageChange}
        rowsPerPage={limit}
        onChangeRowsPerPage={handleChangeLimit}
      />
      <PostEditDialogComponent
        open={open}
        currentPost={currentPost}
        handleClose={handleClose}
        handleCurrentPostTitleChange={handleCurrentPostTitleChange}
        handleCurrentPostBodyChange={handleCurrentPostBodyChange}
      />
    </div>
  );
}

export default App;
