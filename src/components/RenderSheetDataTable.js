import React, { useState, useMemo, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import PlaygroupCard from "./PlaygroupCard_Component/PlaygroupCard";
import applyFilters from "../utils/applyFilters";
import MapComponent from "./MapComponent";
import Loading from "./Loading";
import { handleDateChange } from "../utils/handleDateChange";
import FilterContainer from "./Filter_Component/FilterContainer";
import ToggleButton from "./ToggleButton";
import NoDataText from "./NoDataText";
import ShowTodayButton from "./ShowTodayButton";

const RenderSheetDataTable = ({ sheetData, translation }) => {
  const isLoading = !sheetData || sheetData.length === 0;

  // Define text mappings based on the selected language
  const translations = {
    toggledOn: translation === "fr" ? "Masquer les filtres" : "Hide Filters",
    toggledOff: translation === "fr" ? "Afficher les filtres" : "Show Filters",
    hide: translation === "fr" ? "Masquer la Carte" : "Hide Map",
    show: translation === "fr" ? "Afficher la Carte" : "Show Map",
    showLess: translation === "fr" ? "Afficher moins" : "Show Less",
    showMore: translation === "fr" ? "Afficher plus" : "Show More",
    daysOfWeek: {
      Mon: translation === "fr" ? "Lundi" : "Monday",
      Tue: translation === "fr" ? "Mardi" : "Tuesday",
      Wed: translation === "fr" ? "Mercredi" : "Wednesday",
      Thur: translation === "fr" ? "Jeudi" : "Thursday",
      Fri: translation === "fr" ? "Vendredi" : "Friday",
      Sat: translation === "fr" ? "Samedi" : "Saturday",
      Sun: translation === "fr" ? "Dimanche" : "Sunday",
    },
    timesOfDay: {
      Morning: translation === "fr" ? "Matin" : "Morning",
      Afternoon: translation === "fr" ? "Après-midi" : "Afternoon",
      Evening: translation === "fr" ? "Soir" : "Evening",
    },
    areaOptions: {
      East: translation === "fr" ? "Est" : "East",
      West: translation === "fr" ? "Ouest" : "West",
      Central: translation === "fr" ? "Centre" : "Central",
      South: translation === "fr" ? "Sud" : "South",
    },
    ageOptions: {
      Babies: translation === "fr" ? "Bébés" : "Babies",
      Toddlers: translation === "fr" ? "Tout-petits" : "Toddlers",
      Kids: translation === "fr" ? "Enfants" : "Kids",
    },
  };

  // Reference for scrolling to today's playgroups section
  const todayPlaygroupsSectionRef = useRef(null);

  // State declarations
  const [startDate, setStartDate] = useState(new Date()); // Handles the selected date for filtering
  const [selectedAddress, setSelectedAddress] = useState(null); // Tracks the selected address from map markers
  const [filterCriteria, setFilterCriteria] = useState({
    // Stores the current filter settings
    date: "",
    area: "",
    language: "",
    day: "",
    location: "",
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
      area: "",
      language: "",
      day: "",
      location: "",
      age: "",
      time: "",
    });
  };

  // Show today's playgroups and scroll to the target area
  const showTodayPlaygroups = () => {
    const today = new Date().toLocaleDateString("en-CA");
    console.log("Today:", today);
    setFilterCriteria({ ...filterCriteria, date: today });
    setSelectedAddress(null); // Optionally reset selected address
    if (todayPlaygroupsSectionRef.current) {
      todayPlaygroupsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredData = useMemo(() => {
    if (isLoading) return [];

    let filtered = applyFilters(sheetData, filterCriteria, selectedAddress);
    if (selectedAddress) {
      filtered = filtered.filter(
        (playgroup) => playgroup.Address === selectedAddress
      );
    }
    // Sort filtered data by date in descending order
    filtered.sort((a, b) => new Date(a.Date) - new Date(b.Date));

    return filtered;
  }, [sheetData, filterCriteria, selectedAddress, isLoading]);

  const noDataAvailable = filteredData.length === 0;

  const handleFilterChange = (key, value) => {
    // Deselect marker when the name filter changes or when the area filter changes
    if (key === "location" || key === "area") {
      setSelectedAddress(null);
    }
    setFilterCriteria({ ...filterCriteria, [key]: value });
  };

  const areaOptions = useMemo(() => {
    if (!sheetData) return [];
    const uniqueAreas = [
      ...new Set(sheetData.map((item) => item.Area).filter(Boolean)),
    ];
    return uniqueAreas.map((area) => translations.areaOptions[area] || area);
  }, [sheetData, translations.areaOptions]);

  const languageOptions = useMemo(() => {
    if (!sheetData) return [];
    return [...new Set(sheetData.map((item) => item.Language).filter(Boolean))];
  }, [sheetData]);

  const locationOptions = useMemo(() => {
    if (!sheetData) return [];
    return [...new Set(sheetData.map((item) => item.Location).filter(Boolean))];
  }, [sheetData]);

  const timeOptions = Object.keys(translations.timesOfDay).map(
    (key) => translations.timesOfDay[key]
  );
  const ageOptions = Object.keys(translations.ageOptions).map(
    (key) => translations.ageOptions[key]
  );
  const dayOptions = Object.keys(translations.daysOfWeek); // Short day names for filtering

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex justify-start md:mb-4 mb-2">
        <ShowTodayButton
          onShowToday={showTodayPlaygroups}
          translation={translation}
        />
      </div>
      {/* Button to toggle filters */}
      <div className="flex flex-1 flex-col" id="today-playgroups-section">
        <ToggleButton
          isToggled={isFilterVisible}
          onToggle={() => setIsFilterVisible(!isFilterVisible)}
          labels={{
            toggledOn: translations.toggledOn,
            toggledOff: translations.toggledOff,
          }}
          className="md:hidden"
        />
      </div>
      {/* Filters container */}
      <div className={` ${isFilterVisible ? "" : "hidden md:flex"}`}>
        <FilterContainer
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
          handleFilterChange={handleFilterChange}
          areaOptions={areaOptions}
          ageOptions={ageOptions}
          languageOptions={languageOptions}
          dayOptions={dayOptions}
          timeOptions={timeOptions}
          locationOptions={locationOptions}
          handleDateChange={handleDateChange}
          setStartDate={setStartDate}
          resetFilters={resetFilters}
          dayMapping={translations.daysOfWeek} // Pass the mapping to the FilterContainer
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
            toggledOn: translations.hide,
            toggledOff: translations.show,
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
          ref={todayPlaygroupsSectionRef}
          id="todayPlaygroupsSection"
          className="w-full xl:w-1/2 pt-2 pr-2 overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative"
          style={{ height: "80vh" }}
        >
          {noDataAvailable ? (
            <NoDataText />
          ) : (
            <>
              {filteredData
                .filter((playgroup) => {
                  return (
                    selectedAddress === null ||
                    playgroup.Address === selectedAddress
                  );
                })
                .slice(0, visibleCards)
                .map((playgroup) => (
                  <PlaygroupCard key={playgroup.ID} playgroup={playgroup} />
                ))}
              {/* Show more button if there are more playgroups to display */}
              {visibleCards < filteredData.length && (
                <div className="flex justify-center mb-2">
                  <ToggleButton
                    isToggled={false}
                    onToggle={handleShowMore}
                    labels={{
                      toggledOn: translations.showLess,
                      toggledOff: translations.showMore,
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
