export default function Filter(props) {
  return (
    <div>
      <label htmlFor="filter">filter shown with</label>
      <input
        type="search"
        id="filter"
        value={props.filter}
        onChange={props.handleChange}
      />
    </div>
  );
}
