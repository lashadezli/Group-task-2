import React, { useState, useEffect } from "react";
import JobItem from "./jobitem";
import Filters from "./Filters";
import classes from "../modules/Joblist.module.scss";
import Background from "../images/bg-header-desktop.svg"

 // State variables for job data and selected filters
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
 
   // Fetch job data when component mounts
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setJobs(data));
  }, []);
 
  // Handle filter button click events
  const handleFilterClick = (filter, type) => {
    switch (type) {
      case "role":
        setSelectedRoles((prevRoles) => toggleFilter(prevRoles, filter));
        break;
      case "level":
        setSelectedLevels((prevLevels) => toggleFilter(prevLevels, filter));
        break;
      case "language":
        setSelectedLanguages((prevLanguages) =>
          toggleFilter(prevLanguages, filter)
        );
        break;
      default:
        break;
    }
  };

  // Toggle filter logic to add or remove filter
  const toggleFilter = (prevFilters, filter) => {
    if (prevFilters.includes(filter)) {
      return prevFilters.filter((prevFilter) => prevFilter !== filter);
      //filter() მეთოდი არის განმეორებითი მეთოდი. ის იძახებს მოწოდებულ callbackFn 
      //ფუნქციას ერთხელ მასივის თითოეული ელემენტისთვის და აშენებს ყველა 
      //მნიშვნელობის ახალ მასივს, რომლისთვისაც callbackFn აბრუნებს სინამდვილეს მნიშვნელობას.
      //მასივის ელემენტები, რომლებიც არ გაივლიან callbackFn ტესტს, არ შედის ახალ მასივში
    } else {
      return [...prevFilters, filter];
    }
  };

   // Clear all selected filters
  const clearAllFilters = () => {
    setSelectedRoles([]);
    setSelectedLevels([]);
    setSelectedLanguages([]);
  };

    // Filter jobs based on selected filters
  const filteredJobs = jobs.filter((job) => {
    return (
      (selectedRoles.length === 0 || selectedRoles.includes(job["role"])) &&
      (selectedLevels.length === 0 || selectedLevels.includes(job["level"])) &&
      (selectedLanguages.length === 0 ||
        job["languages"].some((lang) => selectedLanguages.includes(lang)))
        //some() მეთოდი არის განმეორებითი მეთოდი. ის იძახებს მოწოდებულ callbackFn
        //ფუნქციას ერთხელ მასივის თითოეული ელემენტისთვის, სანამ callbackFn არ დააბრუნებს 
        //ჭეშმარიტ მნიშვნელობას. თუ ასეთი ელემენტია ნაპოვნი, some() დაუყოვნებლივ აბრუნებს true
        //და წყვეტს გამეორებას მასივის მეშვეობით.

        //includes მეთოდი აბრუნებს true-s თუ string შეიცავს მითითებულ string-s.
    );
  });

  return (
    <>
      <img className={classes["Image"]} src={Background} alt="none" />
      <Filters
        selectedRoles={selectedRoles}
        selectedLevels={selectedLevels}
        selectedLanguages={selectedLanguages}
        handleFilterClick={handleFilterClick}
        clearAllFilters={clearAllFilters}
      />
      <div className={classes["jobList-container"]}>
        <ul className={classes["job-list"]}>
          {filteredJobs.map((job) => (
            <JobItem key={job["id"]} job={job} handleFilterClick={handleFilterClick} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default JobList;
