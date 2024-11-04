import { useState } from "react";
import "./index.css";

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
  const [newFriendName, setNewFriendName] = useState("");
  const [newFriendBalance, setNewFriendBalance] = useState(0);

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
  };

  const handleAddFriend = () => {
    if (newFriendName.trim() !== "") {
      const newFriend = {
        id: Date.now(),
        name: newFriendName,
        image: `https://i.pravatar.cc/48?u=${Date.now()}`,
        balance: newFriendBalance,
      };
      setFriends([...friends, newFriend]);
      setNewFriendName("");
      setNewFriendBalance(0);
    }
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
        <div className="form-add-friend">
          <label htmlFor="new-friend-name">Name:</label>
          <input
            type="text"
            id="new-friend-name"
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
          />
          <label htmlFor="new-friend-balance">Balance:</label>
          <input
            type="number"
            id="new-friend-balance"
            value={newFriendBalance}
            onChange={(e) => setNewFriendBalance(Number(e.target.value))}
          />
          <button className="button" onClick={handleAddFriend}>
            Add Friend
          </button>
        </div>
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
