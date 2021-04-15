import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField } from "@material-ui/core";

export default function PostListItemComponent(props) {
  const {
    open = false,
    currentPost = {},
    handleClose = () => {},
    handleCurrentPostTitleChange = () => {},
    handleCurrentPostBodyChange = () => {},
  } = props;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
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
  );
}
