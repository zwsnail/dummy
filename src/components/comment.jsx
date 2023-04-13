import { useState, useEffect } from "react";

// This component renders comments for a given post
export const Comment = ({ postID }) => {

    // State to store the comments for the post
    const [comments, setComments] = useState([]);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Load comments for the given post ID
    const loadComments = async () => {
        // const res = await fetch(`http://dummyjson.com/comments/post/${postID}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setComments(data.comments);
        //         setIsLoading(false);
        //     })
        //     .catch(error => {
        //         setError(error.message);
        //         setIsLoading(false);
        //     });
        try {
            const res = await fetch(`http://dummyjson.com/comments/post/${postID}`);
            const data = await res.json();
            setComments(data.comments);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }

    }

    // Load comments when the component mounts or when the post ID changes
    useEffect(() => {
        loadComments();
    }, [postID]);


    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="comment">
            {comments && (
                <div>
                    <p><b>Comments</b></p>
                    <ul>{comments.map((comment) =>
                        <li key={comment.id}>
                            <p>{comment.body} - {comment.user.username} </p>
                        </li>)}
                    </ul>
                </div>
            )}
        </div>

    )

};
