import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import PlaygroupCard from "./PlaygroupCard_Component/PlaygroupCard";
import applyFilters from "../utils/applyFilters";
import MapComponent from "./MapComponent";
import Loading from "../app/loading";
import { handleDateChange } from "../utils/handleDateChange";
import FilterContainer from "./Filter_Component/FilterContainer";
import ToggleButton from "./ToggleButton";
import NoDataText from "./NoDataText";
import ShowTodayButton from "./ShowTodayButton";

const RenderSheetDataTable = ({ sheetData }) => {
  const isLoading = !sheetData || sheetData.length === 0; //// Check if the data is still loading or empty

  // State declarations
  const [startDate, setStartDate] = useState(new Date()); // Handles the selected date for filtering
  const [selectedAddress, setSelectedAddress] = useState(null); // Tracks the selected address from map markers
  const [filteredData, setFilteredData] = useState(sheetData || []); // Stores the filtered data based on criteria
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
  // State for filter options, extracted from sheet data
  const [locationOptions, setLocationOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [timeOptions, setTimeOptions] = useState([
    "Morning",
    "Afternoon",
    "Evening",
  ]);
  const [ageOptions, setAgeOptions] = useState(["Babies", "Toddlers", "Kids"]);
  const [dayOptions, setDayOptions] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

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

  // Show today's playgroups
  const showTodayPlaygroups = () => {
    const today = new Date().toLocaleDateString("en-CA");
    setFilterCriteria({ ...filterCriteria, date: today });
    setSelectedAddress(null); // Optionally reset selected address
  };

  useEffect(() => {
    if (!isLoading) {
      // Extract all unique location, languge, facility from sheetData. If it's not in spreadsheet it will to be displayed in the filter
      setLocationOptions([
        ...new Set(sheetData.map((item) => item.Location).filter(Boolean)),
      ]);
      setLanguageOptions([
        ...new Set(sheetData.map((item) => item.Language).filter(Boolean)),
      ]);
      setNameOptions([
        ...new Set(sheetData.map((item) => item.Name).filter(Boolean)),
      ]);
      // Apply filters to the data
      let filtered = applyFilters(sheetData, filterCriteria, selectedAddress);
      // If a specific location is selected via marker, filter by that as well
      if (selectedAddress) {
        filtered = filtered.filter(
          (playgroup) => playgroup.Address === selectedAddress
        );
      }
      setFilteredData(filtered);
    }
  }, [sheetData, filterCriteria, isLoading, selectedAddress]);

  if (isLoading) return <Loading />;
  //check for no data available
  const noDataAvailable = filteredData.length === 0;

  const handleFilterChange = (key, value) => {
    // Deselect marker when the name filter changes or when the location filter changes
    if (key === "name" || key === "location") {
      setSelectedAddress(null);
    }
    setFilterCriteria({ ...filterCriteria, [key]: value });
  };

  return (
    <div className="flex flex-col lg:flex-col">
      <div className="flex justify-start my-4">
        <ShowTodayButton onShowToday={showTodayPlaygroups} />
      </div>
      {/* Button to toggle filters */}
      <ToggleButton
        isToggled={isFilterVisible}
        onToggle={() => setIsFilterVisible(!isFilterVisible)}
        labels={{
          toggledOn: "Hide Filters",
          toggledOff: "Show Filters",
        }}
        className="md:hidden"
      />
      {/* Filters container */}
      <div
        className={`flex flex-col p-5 space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 sticky top-0 bg-white rounded-lg shadow z-10 mb-5 w-full ${
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
          className={`w-full xl:w-2/5 ${isMapVisible ? "" : "hidden md:flex"}`}
          style={{ height: "85vh" }}
        >
          <MapComponent
            sheetData={filteredData}
            onMarkerSelect={handleMarkerSelect}
          />
        </div>
        {/* Playgroup Cards Section */}
        <div
          className="w-full xl:w-3/5 pt-4 pr-4overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative"
          style={{ height: "80vh" }}
        >
          {noDataAvailable ? (
            <NoDataText />
          ) : (
            <div className="mt-6">
              {filteredData
                .filter((playgroup) => {
                  //additional logic to check that playgroup is not in the past
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
                <div className="flex justify-center mb-4">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderSheetDataTable;
