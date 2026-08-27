import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Comment, Post } from "@/types/posts";
import Image from "next/image";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Link from "next/link";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteComment, deletePost, updateComment } from "../_redux/postSlice";
import { dispatch } from "../_redux/store";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "expand",
})<ExpandMoreProps>(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function PostDetails({
  post,
  isComment = false,
}: {
  post: Post;
  isComment?: boolean;
}) {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const router = useRouter();

  const [commentAnchorEl, setCommentAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [selectedComment, setSelectedComment] = React.useState<Comment | null>(
    null,
  );

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleUpdate() {
    router.push(`/updatePost/${post._id}`);

    handleClose();
  }
  const dispatch = useDispatch<dispatch>();

  const handleCommentMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    comment: Comment,
  ) => {
    setCommentAnchorEl(event.currentTarget);

    setSelectedComment(comment);
  };

  const handleCommentMenuClose = () => {
    setCommentAnchorEl(null);

    setSelectedComment(null);
  };

  async function handleDeleteComment() {
    if (!selectedComment) return;

    const result = await dispatch(deleteComment(selectedComment._id));

    if (deleteComment.fulfilled.match(result)) {
      toast.success("Comment deleted successfully");
    } else {
      toast.error("Failed to delete comment");
    }

    handleCommentMenuClose();
  }

  async function handleUpdateComment() {
    if (!selectedComment) return;

    const newContent = prompt("Update your comment", selectedComment.content);

    if (!newContent) return;

    const result = await dispatch(
      updateComment({
        id: selectedComment._id,
        content: newContent,
      }),
    );

    if (updateComment.fulfilled.match(result)) {
      toast.success("Comment updated successfully");
    }

    handleCommentMenuClose();
  }

  async function handleDelete() {
    const result = await dispatch(deletePost(post._id));

    if (deletePost.fulfilled.match(result)) {
      toast.success("Post deleted successfully");
    } else {
      toast.error("Failed to delete post");
    }

    handleClose();
  }

  console.log("POST DATA:", post);
  console.log("POST USER:", post.user);
  console.log("USER PHOTO:", post.user.photo);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: "50%", mx: "auto", mb: 3, mt: 1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Image
              src={post.user.photo}
              alt={post.user.name}
              style={{ width: "100%", height: "auto" }}
              width={60}
              height={60}
            />
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleUpdate}>Update</MenuItem>

              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </>
        }
        title={post.user.name}
        subheader={post.createdAt.split("T", 1)}
      />
      {post.image && (
        <Image
          src={post.image}
          alt={post.body}
          style={{ width: "100%", height: "auto" }}
          width={400}
          height={300}
        />
      )}
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ThumbUpAltOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentOutlinedIcon />
        </ExpandMore>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{ bgcolor: theme.palette.background.paper }}
      >
        {post.comments.length > 0 && isComment === false ? (
          <CardContent>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  <Image
                    src={post.comments[0].commentCreator.photo}
                    alt={post.user.name}
                    style={{ width: "100%", height: "auto" }}
                    width={60}
                    height={60}
                  />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.comments[0].commentCreator.name}
              subheader={post.comments[0].createdAt.split("T", 1)}
            />
            <Typography sx={{ mb: 2, width: "80%", mx: "auto" }}>
              {post.comments[0].content}
            </Typography>
            <Link
              href={`singlePost/${post._id}`}
              style={{
                display: "block",
                textAlign: "right",
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              View All Comments
            </Link>
          </CardContent>
        ) : (
          post.comments.length > 0 &&
          isComment &&
          post.comments.map((comment: Comment) => (
            <CardContent key={comment._id}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    <Image
                      src={comment.commentCreator.photo}
                      alt={post.user.name}
                      style={{ width: "100%", height: "auto" }}
                      width={60}
                      height={60}
                    />
                  </Avatar>
                }
                action={
                  <>
                    <IconButton
                      onClick={(e) => handleCommentMenuClick(e, comment)}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      anchorEl={commentAnchorEl}
                      open={Boolean(commentAnchorEl)}
                      onClose={handleCommentMenuClose}
                    >
                      <MenuItem onClick={handleUpdateComment}>Update</MenuItem>

                      <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
                    </Menu>
                  </>
                }
                title={comment.commentCreator.name}
                subheader={comment.createdAt.split("T", 1)}
              />
              <Typography sx={{ mb: 2, width: "80%", mx: "auto" }}>
                {comment.content}
              </Typography>
              <Link
                href={`singlePost/${post._id}`}
                style={{
                  display: "block",
                  textAlign: "right",
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
              >
                View All Comments
              </Link>
            </CardContent>
          ))
        )}
      </Collapse>
    </Card>
  );
}
