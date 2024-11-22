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
  const [showAddFriend, setShowAddFriend] = useState(false);
  function HandleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  return (
    <div className="app">
      <div className="sidebar">
        {" "}
        <FriendsList />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={HandleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}
function FriendsList() {
  const friends = initialFriends;
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

function FormAddFriend() {
  return (
    <form className="form-add-friend ">
      <label>👨‍👨 Friend Name </label>
      <input type="text" />
      <label>🎨Image URL</label>
      <input type="text" />
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
