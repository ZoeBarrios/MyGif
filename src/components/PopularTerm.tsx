export default function PopularTerm({ handleClick, keyword }) {
  return (
    <button
      className="border-b-4 border-violet-500 text-2xl hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500 transition-all duration-300 ease-in-out"
      onClick={handleClick}
    >
      {keyword}
    </button>
  );
}
