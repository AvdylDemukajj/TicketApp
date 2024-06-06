
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';

// // const socket = io('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local');
//  const socket = io('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/chat');

// const Chat = () => {
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [searchUsername, setSearchUsername] = useState('');
//     const [userId, setUserId] = useState(null);
//     const [friends, setFriends] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [currentFriend, setCurrentFriend] = useState('');
//     const [message, setMessage] = useState('');
//     const [friendIdToAdd, setFriendIdToAdd] = useState('');
//     const [friendIdToAccept, setFriendIdToAccept] = useState('');

//     const login = async () => {
//         //http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/signin
//         try {
//             const response = await axios.post('http://localhost/api/users/signin', { email, password });
//             setUserId(response.data.userId);
//             setLoggedIn(true);
//             loadFriends(response.data.userId);
//             console.log(response.data);
//         } catch (error) {
//             console.error('Gabim gjatë kyçjes:', error);
//         }
//     };

//     const register = async () => {
//         try {
//             const response = await axios.post('http://localhost:3001/register', { username, password });
//             console.log(response.data);
//         } catch (error) {
//             console.error('Gabim gjatë regjistrimit:', error);
//         }
//     };

//     // const searchUsers = async () => {
//     //     try {
//     //         const response = await axios.get(`http://localhost:3001/search?username=${searchUsername}`);
//     //         console.log(response.data);
//     //     } catch (error) {
//     //         console.error('Gabim gjatë kërkimit të përdoruesve:', error);
//     //     }
//     // };

//     // const addFriend = async () => {
//     //     try {
//     //         await axios.post('http://localhost:3001/add-friend', { userId, friendId: parseInt(friendIdToAdd) });
//     //         loadFriends(userId);
//     //     } catch (error) {
//     //         console.error('Gabim gjatë shtimit të mikut:', error);
//     //     }
//     // };

//     // const acceptFriend = async () => {
//     //     try {
//     //         await axios.post('http://localhost:3001/accept-friend', { userId, friendId: parseInt(friendIdToAccept) });
//     //         loadFriends(userId);
//     //     } catch (error) {
//     //         console.error('Gabim gjatë pranimit të mikut:', error);
//     //     }
//     // };

//     //http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/chat/friends/${userId}

//     const loadFriends = async (userId) => {
//         try {
//             const response = await axios.get(`http"//localhost/api/chat/friends/${userId}`);
//             const friendsList = response.data.map(friend => ({
//                 id: friend.id,
//                 username: friend.friend_username
//             }));
//             setFriends(friendsList);
//             console.log('friendList',friendsList);
//             socket.emit('join', { userId });
//         } catch (error) {
//             console.error('Gabim gjatë ngarkimit të miqve:', error);
//         }
//     };

//     const sendMessage = () => {
//         if (currentFriend !== '' ) {
//             socket.emit('sendMessage', { fromUserId: userId, toUserId: currentFriend.id, message });
//             setMessages([...messages, { from: userId, text: message, to: currentFriend.id }]);
//             setMessage('');
//         }
//     };

//     useEffect(() => {
//         socket.on('receiveMessage', ({ fromUserId, toUserId, message }) => {
//             if (toUserId === userId || fromUserId === currentFriend?.id) {
//                 setMessages(prevMessages => [...prevMessages, { from: fromUserId, text: message, to: userId }]);
//             }
//         });
//     }, [userId, currentFriend]);

//     useEffect(() => {
//         if (userId) {
//             socket.emit('join', { userId });
//         }
//     }, [userId]);

//     const handleFriendChange = (e) => {
//         const friendId = e.target.value;
//         const selectedFriend = friends.find(friend => friend.username === friendId);
//         setCurrentFriend(selectedFriend);
//         console.log(currentFriend,'currentfriend')
//         setMessages([]); // Resetoni mesazhet kur ndryshoni mikun
//     };

//     return (
//         <div>
//             {!loggedIn ? (
//                 <div>
//                     <h2>Kyçu</h2>
//                     <input
//                         type="text"
//                         placeholder="Emri i përdoruesit"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Fjalëkalimi"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <button onClick={login}>Kyçu</button>
//                     <h2>Regjistrohu</h2>
//                     <input
//                         type="text"
//                         placeholder="Emri i përdoruesit"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Fjalëkalimi"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <button onClick={register}>Regjistrohu</button>
//                 </div>
//             ) : (
//                 <div>
//                     {/* <h2>Kërko Përdoruesit</h2>
//                     <input
//                         type="text"
//                         placeholder="Kërko përdorues"
//                         value={searchUsername}
//                         onChange={(e) => setSearchUsername(e.target.value)}
//                     />
//                     <button onClick={searchUsers}>Kërko</button> */}

//                     <h2>Lista e Miqve</h2>
//                     <select onChange={handleFriendChange} value={currentFriend?.id || ''}>
//                         <option value="">Zgjidh mikun</option>
//                         {friends.map(friend => (
//                             <option key={friend.username} value={friend.username}>
//                                 {friend.username}
//                             </option>
//                         ))}
//                     </select>
// {/* 
//                     <h2>Shto Mik</h2>
//                     <input
//                         type="number"
//                         placeholder="ID e mikut"
//                         value={friendIdToAdd}
//                         onChange={(e) => setFriendIdToAdd(e.target.value)}
//                     />
//                     <button onClick={addFriend}>Shto si mik</button> */}
// {/* 
//                     <h2>Prano Mik</h2>
//                     <input
//                         type="number"
//                         placeholder="ID e mikut për të pranuar"
//                         value={friendIdToAccept}
//                         onChange={(e) => setFriendIdToAccept(e.target.value)}
//                     />
//                     <button onClick={acceptFriend}>Prano kërkesën</button> */}

//                     <h2>Chat</h2>
//                     {currentFriend && (
//                         <div>
//                             <h3>Bisedë me {currentFriend.username}</h3>
//                             <div>
//                                 {messages
//                                     .filter(msg => (msg.from === currentFriend.id && msg.to === userId) || (msg.from === userId && msg.to === currentFriend.id))
//                                     .map((msg, index) => (
//                                         <div key={index}>
//                                             <b>{msg.from === userId ? 'Ju: ' : `${currentFriend.username}: `}</b>
//                                             {msg.text}
//                                         </div>
//                                     ))}
//                             </div>
//                             <input
//                                 type="text"
//                                 placeholder="Shkruani një mesazh"
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                             />
//                             <button onClick={sendMessage}>Dërgo Mesazh</button>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Chat;

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(`ws://localhost/api/chat/socket.io`, {
    transports: ['websocket'],
    path: '/api/chat/socket.io'
});

export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = () => {
        socket.emit('sendMessage', message);
        setMessage('');
    };

    return (
        <div>
            <h1>Chat Room</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input 
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}



