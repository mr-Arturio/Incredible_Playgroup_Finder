## The Incredible Playgroup Finder

www.incredibleplaygroupfinder.ca <br>
The Incredible Playgroup Finder is a web app that connects Ottawa parents with local playgroup events. With real-time data from Google Sheets, the app features an interactive map, filterable playgroup cards, and calendar integration.

Our application stands out with its easy-to-use interactive map and a dynamic filtering system that allows users to search for playgroups by location, age group, language preference, date, day, and facility. Data is pulled in real-time from a Google Sheets database, ensuring the most current information is always at hand.

Key features include:

- **Interactive Map & Filters**: View and filter playgroup locations by criteria such as location, age group, language, date, and facility.
- **Real-time Data**: Always have the latest event details, updated directly from Google Sheets.
- **Responsive Design**: Enjoy a seamless experience across all devices—desktop, tablet, and mobile.
- **User-Friendly Features**:  Includes user location detection, detailed event cards, direct navigation to Google Maps.
- **Bilingual Support**: The app supports both English and French languages.
- **Calendar Integration**: Option to add an event to calendar of your choice (Google, Outlook, Apple)
- **Interactive Slider**: Enjoy an engaging slider element with a car that changes the header background color as you slide it, culminating in a confetti celebration at the destination.
- **A Visually Appealing and Intuitive Design**: The overall design is visually appealing and user-friendly.

#### Project Overview

This project leverages the following technologies:

- **Tech Stack**: Next.js 14, Tailwind CSS
- **APIs**: Google Maps JavaScript API, Google Sheets API
- **Deployment**: Vercel
- **DataBase**: [Google Spreadsheets](https://docs.google.com/spreadsheets/d/1C9zhAX6WgU1_dfSy3TC58kppei0ZcprT_E96wgsp0rA/edit?gid=0#gid=0)

#### Dependencies

```json
"dependencies": {
    "@react-google-maps/api": "^2.19.3",
    "@vercel/analytics": "^1.3.1",
    "add-to-calendar-button-react": "^2.6.16",
    "googleapis": "^133.0.0",
    "next": "14.1.0",
    "react": "^18",
    "react-confetti": "^6.1.0",
    "react-datepicker": "^6.6.0",
    "react-dom": "^18",
    "react-icons": "^5.3.0",
    "react-use": "^17.5.1"
},
"devDependencies": {
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.1.0",
    "postcss": "^8",
    "tailwindcss": "^3.3.0"
},
"engines": {
    "node": "20.x"
}
```
### Project File Structure
```bash
├── public                      # Contains various icon images used in the project.
│   ├── docs                    # Contains the work log and related screenshots.
│   └── fonts                   # Contains the Lazy Dog font file used in the project.
│
├── src
│   ├── actions
│   │   └── getSheetData.js     # Fetches and caches Google Sheets data, transforming it into objects
│   │
│   ├── app
│   │   ├── favicon.ico         # Favicon for the app
│   │   ├── fonts.css           # Defines font styles used in the project
│   │   ├── global.css          # Contains custom global CSS styles
│   │   ├── layout.js           # Sets up the root layout, initializes fonts, and manages language context
│   │   └── page.js             # Homepage component fetching data and rendering main content
│   │
│   ├── components
│   │   ├── Filter_Component
│   │   │   ├── ActiveFilters.js
│   │   │   ├── DatePickerComponent.js
│   │   │   ├── FilterComponent.js
│   │   │   ├── FilterContainer.js
│   │   │   └── ResetFiltersButton.js
│   │   │
│   │   ├── Header
│   │   │   ├── CarSlider.js
│   │   │   ├── HamburgerMenu.js
│   │   │   ├── Header.js
│   │   │   └── NavBar.js
│   │   │
│   │   ├── PlaygroupCard_Component
│   │   │   ├── AddToCalendar.js
│   │   │   ├── BasePlaygroupCard.js
│   │   │   ├── CardDetails.js
│   │   │   ├── CardFooter.js
│   │   │   ├── CardHeader.js
│   │   │   ├── PlaygroupCard.js
│   │   │   └── Tooltip.js
│   │   │
│   │   ├── ContactForm.js       # Handles the contact form functionality
│   │   ├── Footer.js            # Contains the footer layout and content
│   │   ├── IntroductionText.js  # Displays the introductory text on the homepage
│   │   ├── LanguageSwitcher.js  # Manages language switching functionality
│   │   ├── Loading.js           # Displays a loading text
│   │   ├── MapComponent.js      # Manages the display and interaction with maps
│   │   ├── NoDataText.js        # Shows a message when no data is available
│   │   ├── RenderSheetDataTable.js # Renders and filters playgroup data fetched from Google Sheets, allowing users to toggle between map and list views, apply filters, and view additional playgroups dynamically.
│   │   ├── ShowTodayButton.js   # Toggles the display of today's events
│   │   └── ToggleButton.js      # A generic toggle button component
│   │
│   ├── context
│   │   └── LanguageContext.js   # Manages the language context for the application
│   │
│   └── utils
│       ├── applyFilters.js      # Utility for applying filters to data
│       ├── dateUtils.js         # Utility functions related to date handling
│       ├── geocodeAddress.js    # Utility for geocoding addresses
│       ├── gradient.js          # Utility for handling gradients
│       ├── handleDateChange.js  # Utility for managing date changes
│       ├── icons.js             # Utility for managing icons for PlaygroupCards footer
│       ├── RandomImage.js       # Utility for selecting random images ffor header
│       ├── transformDataToObjects.js # Transforms sheet data into objects
│       ├── translationMapping.js # Manages translation mappings for filters
│       └── TTLCache.js          # Utility for handling time-to-live caching
```

## Setup

Clone the repository to your local environment:
```bash
git clone [repository-url]
cd [repository-directory]
npm install
npm run dev
```
Navigate to http://localhost:3000 in your browser to view the app.

#### Development Resources

- Add To Calendar configuration: https://add-to-calendar-button.com/#demo <br>
  - CSS configuration example: `styleLight="--btn-background: #2f4377; --btn-text: #fff; --font: Georgia, 'Times New Roman', Times, serif;"` https://github.com/add2cal/add-to-calendar-button/blob/main/assets/css/atcb-text.css
- React Date picker configuration: https://reactdatepicker.com/#example-custom-day <br>
- Icons : https://uxwing.com/, https://iconduck.com/ <br>
- Address to GPS Coordinates: https://www.gps-coordinates.net/ <br>
- Background generators: https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/, https://bgjar.com/, https://app.haikei.app/ <br>
- Web page audits: https://pagespeed.web.dev/, https://lighthouse-metrics.com/
- File Convertor: https://convertio.co/

