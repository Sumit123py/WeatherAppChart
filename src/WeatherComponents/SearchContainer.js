import React from "react";

const SearchContainer = ({
  HandleInput,
  HandleData,
  setShowGraph,
  setIsTyping,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      HandleData(e);
      setIsTyping(false);
    }
  };
  return (
    <>
      <form onSubmit={HandleData} className="searchContainer">
        <input
          className="search"
          type="text"
          name="search"
          id="searchId"
          placeholder="Enter City Name"
          autoComplete="off"
          onChange={HandleInput}
          onKeyDown={handleKeyPress}
          onBlur={() => setIsTyping(false)}
        />
        <button onClick={HandleData} className="searchIcon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <p onClick={() => setShowGraph(true)} className="graph">
          ShowGraph
        </p>
      </form>
    </>
  );
};

export default SearchContainer;
