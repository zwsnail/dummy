import { useState, useEffect } from "react";
// import useFetch from "./useFetch";

export const Users = (props) => {

    const userAPI = 'https://dummyjson.com/users';
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        const res = await fetch(userAPI)
            .then(res => res.json())

        setUsers(res.users);
    }

    const handleClick = (userID) => {
        props.getOneUserAllPosts(userID);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="users">
            {users &&
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <p>{user.firstName} {user.lastName}</p>
                            <button onClick={handleClick(user.id)}>Get Posts</button>
                        </li>
                    ))}
                </ul>
            }
        </div >

    )

};
