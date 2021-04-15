import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import EditIcon from "@material-ui/icons/Edit";

export default function PostListItemComponent(props) {
  const { post, setCurrentPost = () => {}, setOpen = () => {} } = props;

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
}
