import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, makeStyles } from "react";
import Pagination from "@material-ui/lab/Pagination";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";

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
  }, []);

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

  const handleClickOpen = () => {
    setOpen(true);
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
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <MailOutlineIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={post.title}
                  secondary={
                    post.body.length < 100
                      ? post.body
                      : post.body.substring(0, 100) + "..."
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setCurrentPost(JSON.parse(JSON.stringify(post)));
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
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
      <Dialog open={open} onClose={handleClose} fullWidth>
        {/* <DialogTitle>{"Edit the post"}</DialogTitle> */}
        <DialogContent width={"30vh"}>
          <TextField
            multiline
            label="Title"
            rows={2}
            defaultValue={currentPost.title}
            onChange={handleCurrentPostTitleChange}
            fullWidth
          />
        </DialogContent>
        <DialogContent width={"30vh"}>
          <TextField
            label="Body"
            multiline
            rows={10}
            defaultValue={currentPost.body}
            onChange={handleCurrentPostBodyChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="secondary">
            Discard
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
