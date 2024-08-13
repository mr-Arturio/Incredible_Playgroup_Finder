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
import { getNextOccurrences } from "../utils/dateUtils";

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
      "Baby (non-walking)":
        translation === "fr" ? "Bébé (non marchant)" : "Baby (non-walking)",
      "Baby (0-12m)": translation === "fr" ? "Bébé (0-12mois)" : "Baby (0-12m)",
      "Baby (0-18m)": translation === "fr" ? "Bébé (0-18mois)" : "Baby (0-18m)",
      "Baby (0-24m)": translation === "fr" ? "Bébé (0-24mois)" : "Baby (0-24m)",
      "Child (0-6y)": translation === "fr" ? "Enfant (0-6ans)" : "Child (0-6y)",
      "Child (3-6y)": translation === "fr" ? "Enfant (3-6ans)" : "Child (3-6y)",
      "Child (4-10y)":
        translation === "fr" ? "Enfant (4-10ans)" : "Child (4-10y)",
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
    organizer: "",
    age: "",
    time: "",
  });
  // State to control filter container visibility
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  // Controls visibility of the map
  const [isMapVisible, setIsMapVisible] = useState(false);
  // State to control the number of visible cards
  const [visibleCards, setVisibleCards] = useState(6);
  // State to track if any filters are active
  const [isFilterActive, setIsFilterActive] = useState(false);

  const handleShowMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 6);
  };

  const handleMarkerSelect = (Address) => {
    setSelectedAddress(Address); // Set the address when a map marker is selected
    setIsFilterActive(true); // Mark filter as active when a marker is selected
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
      organizer: "",
      age: "",
      time: "",
    });
    setIsFilterActive(false); // Reset filter state
  };

  const showTodayPlaygroups = () => {
    const today = new Date().toLocaleDateString("en-CA");
    console.log("Today (en-CA):", today);

    setFilterCriteria({ ...filterCriteria, date: today });
    setSelectedAddress(null); // Optionally reset selected address
    if (todayPlaygroupsSectionRef.current) {
      todayPlaygroupsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to get next occurrence of playgroups based on repeats logic
  const getFilteredData = () => {
    if (isLoading) return [];

    let filtered = applyFilters(sheetData, filterCriteria, selectedAddress);

    //logic for the map - selected pin will be the only one shown in map
    if (selectedAddress) {
      filtered = filtered.filter(
        (playgroup) => playgroup.Address === selectedAddress
      );
    }

    filtered = filtered.map((playgroup) => {
      let eventDate;
      if (playgroup.eventDate) {
        eventDate = new Date(playgroup.eventDate).toISOString().split("T")[0];
      } else if (playgroup.Repeats) {
        const nextOccurrence = getNextOccurrences(
          playgroup.Day,
          playgroup.Repeats
        );
        if (nextOccurrence) {
          eventDate = nextOccurrence.toISOString().split("T")[0];
        }
      }
      return {
        ...playgroup,
        Date: eventDate || "",
      };
    });
      // Sort filtered data by date in ascending order
    filtered.sort((a, b) => new Date(a.Date) - new Date(b.Date));
   
    return filtered;
  };

  const filteredData = useMemo(() => {
    const data = getFilteredData();
    return data;
  }, [sheetData, filterCriteria, selectedAddress, isLoading]);

  const noDataAvailable = filteredData.length === 0;

  const handleFilterChange = (key, value) => {
    if (key === "day") {
      // Reset date filter and date picker when day filter changes
      setFilterCriteria((prevCriteria) => ({
        ...prevCriteria,
        day: value,
        date: "", // Reset the date filter
      }));
      setStartDate(null); // Reset the date picker to today's date
    } else {
      // Deselect marker when the name filter changes or when the area filter changes
      if (key === "organizer" || key === "area") {
        setSelectedAddress(null);
      }
      setFilterCriteria((prevCriteria) => ({
        ...prevCriteria,
        [key]: value,
      }));
    }
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

  const organizerOptions = useMemo(() => {
    if (!sheetData) return [];
    return [
      ...new Set(sheetData.map((item) => item.Organizer).filter(Boolean)),
    ].sort();
  }, [sheetData]);

  const timeOptions = Object.keys(translations.timesOfDay).map(
    (key) => translations.timesOfDay[key]
  );
  const ageOptions = useMemo(() => {
    if (!sheetData) return [];
    return [...new Set(sheetData.map((item) => item.Age).filter(Boolean))].map(
      (age) => translations.ageOptions[age] || age
    );
  }, [sheetData, translations.ageOptions]);

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
          organizerOptions={organizerOptions}
          handleDateChange={handleDateChange}
          setStartDate={setStartDate}
          resetFilters={resetFilters}
          isFilterActive={isFilterActive}
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
          className={`w-full md:h-[85vh] xl:w-1/2 ${
            isMapVisible ? "" : "hidden md:flex"
          } h-[55vh]`}
        >
          <MapComponent
            sheetData={filteredData}
            selectedAddress={selectedAddress}
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
                  <PlaygroupCard
                    key={playgroup.ID}
                    playgroup={playgroup}
                    translation={translation}
                  />
                ))}
              {/* Show more button if there are more playgroups to display */}
              {visibleCards < filteredData.length && (
                <div className="flex justify-center mb-1 md:mb-2">
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
