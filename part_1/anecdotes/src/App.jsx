import { useState } from "react";

const Anecdote = (props) => {
  return (
    <div>
      {props.anecdote} <br /> has {props.votes} votes{" "}
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [votes, setVotes] = useState(
    Array.from({ length: anecdotes.length }).fill(0)
  );
  const [selected, setSelected] = useState(0);
  const mostVoted = Math.max(...votes);
  const mostVotedIndex = votes.indexOf(mostVoted);

  function handleRandomAnecdote() {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  function handleVote() {
    setVotes((votes) =>
      votes.map((vote, index) => {
        if (selected === index) return vote + 1;
        return vote;
      })
    );
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <br />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleRandomAnecdote}>next anecdote</button>
      <h1>anecdote with most votes</h1>
      <Anecdote
        anecdote={anecdotes[mostVotedIndex]}
        votes={votes[mostVotedIndex]}
      />
    </div>
  );
};

export default App;

