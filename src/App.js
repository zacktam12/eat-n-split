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
  const [selectedFriend, setSelectedFriend] = useState(null);

  function HandleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function HandleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function HandleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }
  function HandleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        {" "}
        <FriendsList
          friends={friends}
          onSelection={HandleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={HandleAddFriend} />}
        <Button onClick={HandleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={HandleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <>
      <li className={isSelected ? "selected" : ""}>
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
        <Button onClick={() => onSelection(friend)}>
          {isSelected ? "close" : "open"}
        </Button>
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [PaidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - PaidByUser : "";
  const [whoPaid, setWhopaid] = useState("user");
  function HandleSubmit(e) {
    e.preventDefault();
    if (!bill || !PaidByUser) return;
    onSplitBill(whoPaid === "user" ? paidByFriend : -PaidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={HandleSubmit}>
      <h2>Split a Bill with {selectedFriend.name} </h2>
      <label>💰Bill value </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>🕺Your expense</label>
      <input
        type="text"
        value={PaidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? PaidByUser : Number(e.target.value)
          )
        }
      />
      <label>👨‍👩{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>🤑Who is paying the bill</label>
      <select
        value={whoPaid}
        onChange={(e) => setWhopaid(Number(e.target.value))}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
