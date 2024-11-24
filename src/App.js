import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
    age: 30,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
    age: 25,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
    age: 35,
  },
];
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function HandleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function HandleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  return (
    <div className="app">
      <div className="sidebar">
        {" "}
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={HandleAddFriend} />}
        <Button onClick={HandleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}
function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <>
      <li>
        <img src={friend.image} alt={"img"}></img>
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">
            you owe {friend.name} {Math.abs(friend.balance)}$
          </p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            you owe {friend.name} {Math.abs(friend.balance)}$
          </p>
        )}
        {friend.balance === 0 && <p>you and {friend.name} are even</p>}
        <Button>Select</Button>
      </li>
    </>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState();
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function HandleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend " onSubmit={HandleSubmit}>
      <label>👨‍👨 Friend Name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🎨Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a Bill with </h2>
      <label>💰Bill value</label>
      <input type="text" />
      <label>🕺Your expense</label>
      <input type="text" />
      <label>👨‍👩X's expense</label>
      <input type="text" disabled />
      <label>🤑Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
