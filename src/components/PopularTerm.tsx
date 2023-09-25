export default function PopularTerm({ handleClick, keyword }) {
  return (
    <button className="border-b-4 border-indigo-500" onClick={handleClick}>
      {keyword}
    </button>
  );
}
