import { useState, useEffect } from "react";
// import useFetch from "./useFetch";

export const Comment = ({ postID }) => {

    const [comments, setComments] = useState([]);

    const loadComments = async () => {
        const res = await fetch(`http://dummyjson.com/comments/post/${postID}`)
            .then(res => res.json())

        setComments(res.comments);
    }


    useEffect(() => {
        loadComments();
    }, [postID]);

    return (
        <div className="comment">
            {comments && (
                <div>
                    <p><b>Comments</b></p>
                    <ul>{comments.map((comment) =>
                        <li key={comment.id}>
                            <p>{comment.body}</p>
                        </li>)}
                    </ul>
                </div>
            )}
        </div>

    )

};
