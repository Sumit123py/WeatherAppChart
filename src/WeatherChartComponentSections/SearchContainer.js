import React from "react";

const SearchContainer = ({ setPlace, handleData, HandleInput, setIsTyping }) => {

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          handleData(e);
          setIsTyping(false)
        }
      };
    
      
  return (
    <form onSubmit={handleData} className="searchContainer">
      
      <input
        className="search"
        onInput={HandleInput}
        onKeyDown={handleKeyPress}
        type="text"
        name="search"
        id="search"
        placeholder="Enter City Name"
        onBlur={() => setIsTyping(false)}
      />
      <button type="submit" className="searchIcon">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
    
  );
};

export default SearchContainer;
