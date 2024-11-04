import { useState } from "react";
import "./index.css"; // Import the CSS file

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <ul>
          {friends.map((friend) => (
            <li
              key={friend.id}
              className={selectedFriend?.id === friend.id ? "selected" : ""}
              onClick={() => handleFriendSelect(friend)}
            >
              <img src={friend.image} alt={friend.name} />
              <h3>{friend.name}</h3>
              <p className={friend.balance < 0 ? "red" : "green"}>
                Balance: {friend.balance}
              </p>
              <button className="button">Settle Up</button>
            </li>
          ))}
        </ul>
        <button className="button">Add Friend</button>
      </div>

      <div className="content">
        {selectedFriend && (
          <div>
            <h2>Selected Friend: {selectedFriend.name}</h2>
            <p>Balance: {selectedFriend.balance}</p>
          </div>
        )}
      </div>
    </div>
  );
}
