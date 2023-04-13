import { useState, useEffect } from "react";

export const Users = (props) => {

    const userAPI = 'https://dummyjson.com/users';
    // This is the state that stores all users
    const [users, setUsers] = useState([]);
    // This state is used to highlight the active user
    const [activeUserID, setActiveUserID] = useState(1);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // This function loads the users from the API
    const loadUsers = async () => {
        const res = await fetch(userAPI)
            .then(res => res.json())
            .then(data => {
                setUsers(data.users)
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }

    // This function sets the active user ID and calls a function passed from the parent component
    const handleClick = (userID) => {
        setActiveUserID(userID);
        props.getOneUserAllPosts(userID);
    }

    // This effect runs once when the component is mounted and loads the users from the API
    useEffect(() => {
        loadUsers();
    }, []);


    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // This component renders the list of users
    return (
        <>
            {users &&
                <th>
                    {users.map(user => (
                        <div className={`users ${activeUserID === user.id && "active"}`} key={user.id}>
                            <span>{user.firstName} {user.lastName}</span>
                            <button onClick={() => handleClick(user.id)}>Get Posts</button>
                        </div>
                    ))}
                </th >
            }
        </>

    )

};
