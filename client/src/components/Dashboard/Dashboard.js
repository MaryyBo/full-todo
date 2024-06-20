import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../../api/userApi';
import TodoPage from '../../pages/TodoPage';

const Dashboard = (props) => {
    const [isUser, setIsUser] = useState(false); // Логічна змінна , чи є у нас юзер чи немає

    const navigate = useNavigate();

    useEffect(() => {
        if (!props.user) {
            const token = localStorage.getItem('token')

            if (token) {
                authUser(token)
                    .then(userData => {
                        props.sendUser(userData.data)
                    })
                    .catch(error => {
                        return navigate('/');
                    })
            } else {
                return navigate('/');
            }
        } else {
            setIsUser(true);
        }
    }, [props.user])

    return (
        <div>
            {isUser ? <TodoPage /> : null}
        </div>
    );
}

export default Dashboard;
