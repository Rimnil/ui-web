import "./post.css";
import {MoreVert}  from "@material-ui/icons";  
import {useState} from "react";
import axios from "axios";
import { useContext, useEffect } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";;


export default function  Post ({post}) {

    const [like,setLike] = useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(false)
    const [user,setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
        const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
    };
    fetchUser();
    },[post.userId]);

    const likeHandler =()=>{
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)

    }


    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to = {`profile/${user.username}`}>
                        <img src={user.profilePicture || PF+"person/no_avtar.png"}
                        alt="" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">
                            {user.username}
                            </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <spam className="postText">{Post?.desc}</spam>
                    <img src= {PF+post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                        <div className="postBottomLeft">
                            <img src={`${PF}like.png`} onClick={likeHandler} alt="" className="likeIcon" />
                            <img src={`${PF}love.png`} onClick={likeHandler} alt="" className="likeIcon" />
                            <span className="postLikeCounter">{like} people like it</span>
                        </div>
                        <div className="postBotttomRight">
                            <span className="postCommentText">{Post.comment} comments</span>
                        </div>
                    </div>
                </div>
            </div>
    )
}
