import React from "react";
import classes from "../modules/joblist.module.scss";

function Filters({
  selectedRoles,
  selectedLevels,
  selectedLanguages,
  handleFilterClick,
  clearAllFilters,
}) {
  return (
    <div className={classes["filter-container"]}>
      <div className={classes["left-side-index"]}>
         {/* Display selected roles with remove button */}
        {selectedRoles.map((role, index) => (
          <span key={index} className={classes["filter-item"]}>
            {role}
            <button
              className={classes["remove-filter"]}
              onClick={() => handleFilterClick(role, "role")}
            >
              &#10005;
            </button>
          </span>
        ))}
        {/* Display selected roles with remove button */}
        {selectedLevels.map((level, index) => (
          <span key={index} className={classes["filter-item"]}>
            {level}
            <button
              className={classes["remove-filter"]}
              onClick={() => handleFilterClick(level, "level")}
            >
              &#10005;
            </button>
          </span>
        ))}
          {/* Display selected roles with remove button */}  
        {selectedLanguages.map((language, index) => (
          <span key={index} className={classes["filter-item"]}>
            {language}
            <button
              className={classes["remove-filter"]}
              onClick={() => handleFilterClick(language, "language")}
            >
              &#10005;
            </button>
          </span>
        ))}
      </div>
    {/* Display "Clear" button if any filters are selected */}
      <div className={classes["right-side-index"]}>
        {selectedRoles.length > 0 ||
        selectedLevels.length > 0 ||
        selectedLanguages.length > 0 ? (
          <button onClick={clearAllFilters}>Clear</button>
        ) : null}
      </div>
    </div>
  );
}

export default Filters;
