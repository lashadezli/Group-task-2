import React from "react";
import classes from "../modules/joblist.module.scss";

// // List item with a unique key and specific class

function JobItem({ job, handleFilterClick }) {
  return (
    <li key={job["id"]} className={classes["job-item"]}>
      <img
        src={job["logo"]}
        alt={`${job.company} logo`}
        className={classes["logo"]}
      />
      <div className={classes["job-details"]}>
        <div className={["left-side"]}>
          <div className={classes["first-part"]}>
            <p className={classes["Company"]}>{job["company"]}</p>
            {job["new"] && <p className={classes["Duration"]}><span>New!</span></p>}
            {job["featured"] && <p className={classes["Featured"]}><span>Featured</span></p>}
          </div>
          <div className={classes["position"]}>
            <h2>{job["position"]}</h2>
          </div>
          <div className={classes["details2"]}>
            <p>{job["postedAt"]}</p>
            {job["contract"] && <li>{job["contract"]}</li>}
            {job["location"] && <li>{job["location"]}</li>}
          </div>
        </div>
        <div className={classes["right-side"]}>
          <div className={classes["role-jobs"]}>
            {job["role"] && (
              <button onClick={() => handleFilterClick(job["role"], "role")}>
                {job["role"]}
              </button>
            )}
            {job["level"] && (
              <button onClick={() => handleFilterClick(job["level"], "level")}>
                {job["level"]}
              </button>
            )}
            {job["languages"].map((language, index) => (
              <button
                key={index}
                onClick={() => handleFilterClick(language, "language")}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

export default JobItem;
