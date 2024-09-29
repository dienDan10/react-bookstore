import { FaSearch } from "react-icons/fa";

function SearchBox() {
  return (
    <div className="flex-1 relative">
      <FaSearch className="absolute right-[10px] top-2 text-indigo-900" />
      <input
        type="text"
        className="w-full rounded-full px-3 py-1 focus:outline-indigo-900 "
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBox;
