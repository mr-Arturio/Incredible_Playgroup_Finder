import React, { useState, useMemo, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import PlaygroupCard from "./PlaygroupCard_Component/LargePlaygroupCard";
import applyFilters from "../utils/applyFilters";
import MapComponent from "./MapComponent";
import Loading from "../app/loading";
import { handleDateChange } from "../utils/handleDateChange";
import FilterContainer from "./Filter_Component/FilterContainer";
import ToggleButton from "./ToggleButton";
import NoDataText from "./NoDataText";
import ShowTodayButton from "./ShowTodayButton";

const RenderSheetDataTable = ({ sheetData }) => {
  const isLoading = !sheetData || sheetData.length === 0;

  // Reference for scrolling to today's playgroups section
  const todayPlaygroupsSectionRef = useRef(null);

  // State declarations
  const [startDate, setStartDate] = useState(new Date()); // Handles the selected date for filtering
  const [selectedAddress, setSelectedAddress] = useState(null); // Tracks the selected address from map markers
  const [filterCriteria, setFilterCriteria] = useState({
    // Stores the current filter settings
    date: "",
    location: "",
    language: "",
    day: "",
    name: "",
    age: "",
    time: "",
  });
  // State to control filter container visibility
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  // Controls visibility of the map
  const [isMapVisible, setIsMapVisible] = useState(false);

  // State to control the number of visible cards
  const [visibleCards, setVisibleCards] = useState(6);
  const handleShowMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 6);
  };

  const handleMarkerSelect = (Address) => {
    setSelectedAddress(Address); // Set the address when a map marker is selected
  };

  // Reset all filters to default states, including clearing selected markers
  const resetFilters = () => {
    setSelectedAddress(null);
    setStartDate(new Date()); // Reset the date picker to today's date
    setFilterCriteria({
      date: "",
      location: "",
      language: "",
      day: "",
      name: "",
      age: "",
      time: "",
    });
  };

  // Show today's playgroups and scroll to the target area
  const showTodayPlaygroups = () => {
    const today = new Date().toLocaleDateString("en-CA");
    setFilterCriteria({ ...filterCriteria, date: today });
    setSelectedAddress(null); // Optionally reset selected address
    if (todayPlaygroupsSectionRef.current) {
      todayPlaygroupsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dayMapping = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thur: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  const dayOptions = Object.keys(dayMapping); // Short day names for filtering

  const filteredData = useMemo(() => {
    if (isLoading) return [];

    let filtered = applyFilters(sheetData, filterCriteria, selectedAddress);
    if (selectedAddress) {
      filtered = filtered.filter(
        (playgroup) => playgroup.Address === selectedAddress
      );
    }
    return filtered;
  }, [sheetData, filterCriteria, selectedAddress, isLoading]);

  const noDataAvailable = filteredData.length === 0;

  const handleFilterChange = (key, value) => {
    // Deselect marker when the name filter changes or when the location filter changes
    if (key === "name" || key === "location") {
      setSelectedAddress(null);
    }
    setFilterCriteria({ ...filterCriteria, [key]: value });
  };

  const locationOptions = useMemo(() => {
    if (!sheetData) return [];
    return [...new Set(sheetData.map((item) => item.Location).filter(Boolean))];
  }, [sheetData]);

  const languageOptions = useMemo(() => {
    if (!sheetData) return [];
    return [...new Set(sheetData.map((item) => item.Language).filter(Boolean))];
  }, [sheetData]);

  const nameOptions = useMemo(() => {
    if (!sheetData) return [];
    return [...new Set(sheetData.map((item) => item.Name).filter(Boolean))];
  }, [sheetData]);

  const timeOptions = ["Morning", "Afternoon", "Evening"];
  const ageOptions = ["Babies", "Toddlers", "Kids"];

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex justify-start md:mb-4 mb-2">
        <ShowTodayButton onShowToday={showTodayPlaygroups} />
      </div>
      {/* Button to toggle filters */}
      <div className="flex flex-1 flex-col" id="today-playgroups-section">
        <ToggleButton
          isToggled={isFilterVisible}
          onToggle={() => setIsFilterVisible(!isFilterVisible)}
          labels={{
            toggledOn: "Hide Filters",
            toggledOff: "Show Filters",
          }}
          className="md:hidden"
        />
      </div>
      {/* Filters container */}
      <div
        className={`flex flex-col py-3 px-5 space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 bg-white rounded-lg shadow mb-4 w-full ${
          isFilterVisible ? "" : "hidden md:flex"
        }`}
      >
        <FilterContainer
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
          handleFilterChange={handleFilterChange}
          locationOptions={locationOptions}
          ageOptions={ageOptions}
          languageOptions={languageOptions}
          dayOptions={dayOptions}
          timeOptions={timeOptions}
          nameOptions={nameOptions}
          handleDateChange={handleDateChange}
          setStartDate={setStartDate}
          resetFilters={resetFilters}
          dayMapping={dayMapping} // Pass the mapping to the FilterContainer
        />
      </div>
      {/* Content Sections */}
      <div className="flex flex-1 flex-col xl:flex-row-reverse">
        {/* Map Section */}
        {/* Button to toggle map */}
        <ToggleButton
          isToggled={isMapVisible}
          onToggle={() => setIsMapVisible(!isMapVisible)}
          labels={{
            toggledOn: "Hide Map",
            toggledOff: "Show Map",
          }}
          className="md:hidden"
        />

        <div
          className={`w-full xl:w-1/2 ${isMapVisible ? "" : "hidden md:flex"} `}
          style={{ height: "85vh" }}
        >
          <MapComponent
            sheetData={filteredData}
            onMarkerSelect={handleMarkerSelect}
          />
        </div>
        {/* Playgroup Cards Section */}
        <div
          className="w-full xl:w-1/2 pt-2 pr-2 overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative"
          style={{ height: "80vh" }}
        >
          {noDataAvailable ? (
            <NoDataText />
          ) : (
            <>
              {filteredData
                .filter((playgroup) => {
                  // Additional logic to check that playgroup is not in the past
                  const playgroupDate = new Date(playgroup.Date);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return (
                    selectedAddress === null ||
                    (playgroup.Address === selectedAddress &&
                      playgroupDate >= today)
                  );
                })
                .slice(0, visibleCards)
                .map((playgroup) => (
                  <PlaygroupCard key={playgroup.ID} playgroup={playgroup} />
                ))}
              {visibleCards < filteredData.length && (
                <div className="flex justify-center mb-2">
                  <ToggleButton
                    isToggled={false}
                    onToggle={handleShowMore}
                    labels={{
                      toggledOn: "Show Less",
                      toggledOff: "Show More",
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RenderSheetDataTable;
