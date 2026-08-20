import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Comment, Post } from '@/types/posts';
import Image from 'next/image';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Link from 'next/link';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "expand",
})<ExpandMoreProps>(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function PostDetails({post, isComment = false} : {post : Post, isComment?: boolean}) {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
     <Card sx={{ maxWidth: '50%', mx: 'auto', mb: 3, mt:1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
             <Image src={post.user.photo} alt={post.user.name} style={{width: '100%', height: 'auto'}} width={60} height={60}/>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.name}
        subheader={post.createdAt.split('T', 1)}
      />
      {post.image && <Image src={post.image} alt={post.body} style={{width: '100%', height: 'auto'}} width={400} height={300} />}
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{bgcolor: theme.palette.background.paper}}>
          {post.comments.length > 0 && isComment === false? <CardContent>
             <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
             <Image src={post.comments[0].commentCreator.photo} alt={post.user.name} style={{width: '100%', height: 'auto'}} width={60} height={60}/>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.comments[0].commentCreator.name}
        subheader={post.comments[0].createdAt.split('T', 1)}
      /> 
      <Typography sx={{mb: 2, width: '80%', mx: 'auto'}}>
        {post.comments[0].content}
      </Typography>
      <Link href={`singlePost/${post._id}`} style={{display: 'block', textAlign: 'right', color: theme.palette.primary.main ,textDecoration: 'none'}}>View All Comments</Link>
      </CardContent> : post.comments.length > 0 && isComment && post.comments.map((comment: Comment) => <CardContent key={comment._id}>
             <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
             <Image src={comment.commentCreator.photo} alt={post.user.name} style={{width: '100%', height: 'auto'}} width={60} height={60}/>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={comment.commentCreator.name}
        subheader={comment.createdAt.split('T', 1)}
      /> 
      <Typography sx={{mb: 2, width: '80%', mx: 'auto'}}>
        {comment.content}
      </Typography>
      <Link href={`singlePost/${post._id}`} style={{display: 'block', textAlign: 'right', color: theme.palette.primary.main ,textDecoration: 'none'}}>View All Comments</Link>
      </CardContent> )}
           
        
      </Collapse>
    </Card>
    
  );
}
