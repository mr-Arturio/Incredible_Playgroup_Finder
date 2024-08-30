## Parent Resource Playgroup Finder application.

www.incredibleplaygroupfinder.ca <br>
Parent Resource Playgroup Finder is a user-friendly web application that connects parents in Ottawa with playgroup events suited for their children. Utilizing a real-time Google Sheets database, our application offers an interactive map, filterable playgroup cards and option to add aevents to your calendar for a tailored experience.

Our application stands out with its easy-to-use interactive map and a dynamic filtering system that allows users to search for playgroups by location, age group, language preference, date, day, and facility. Data is pulled in real-time from a Google Sheets database, ensuring the most current information is always at hand.

Key features include:

- **Interactive Map**: View playgroup locations across Ottawa, with the option to filter based on various criteria.
- **Real-time Data**: Playgroup information is continuously updated, providing the latest event details.
- **Filter Options**: Search for playgroups by location, age group, language, date, day, or name.
- **Responsive Design**: Whether on desktop, tablet or mobile, the experience is seamless.
- **User Location Detection**: With permission, the app will show your location on the map for convenience.
- **Detailed Event Information**: Reactive playgroup cards with detailed event information.
- **Bilingual Support**: The app supports both English and French languages.
- **Direct Navigation**: Clicking an address takes you to Google Maps to easily find directions.
- **Date Picker**: React DatePicker is integrated for easy date selection.
- **Add To Calendar**: Option to add an event to calendar of your choice (Google, Outlook, Apple)
- **Interactive Slider**: Enjoy an engaging slider element with a car that changes the header background color as you slide it, culminating in a confetti celebration at the destination.
- **Pleasant and Nice Design**: The overall design is visually appealing and user-friendly.

#### Project Overview

This project leverages the following technologies:

- **Tech Stack**: Next.js 14, Tailwind CSS
- **APIs**: Google Maps JavaScript API, Google Sheets API
- **Deployment**: Vercel

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
│   │   ├── Loading.js           # Displays a loading spinner or animation
│   │   ├── MapComponent.js      # Manages the display and interaction with maps
│   │   ├── NoDataText.js        # Shows a message when no data is available
│   │   ├── RenderSheetDataTable.js # Renders data from Google Sheets as a table
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
│       ├── icons.js             # Utility for managing icons
│       ├── RandomImage.js       # Utility for selecting random images
│       ├── transformDataToObjects.js # Transforms sheet data into objects
│       ├── translationMapping.js # Manages translation mappings
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


### Future Development

- use page speed and other analitics to improve app performance
- deploy on PRC Vercel
- connect hotjar - web analytics
- translations to separate file
- add to calendar info card size and mobile location?
- Provide instructions on how to populate data in the spreadsheet.
- README

`npm install @react-google-maps/api`<br>
`npm install react-datepicker` 

#### Development Resources

- Add To Calendar configuration: https://add-to-calendar-button.com/#demo <br>
  - CSS configuration example: `styleLight="--btn-background: #2f4377; --btn-text: #fff; --font: Georgia, 'Times New Roman', Times, serif;"` https://github.com/add2cal/add-to-calendar-button/blob/main/assets/css/atcb-text.css
- React Date picker configuration: https://reactdatepicker.com/#example-custom-day <br>
- Icons : https://uxwing.com/, https://iconduck.com/ <br>
- Address to GPS Coordinates: https://www.gps-coordinates.net/ <br>
- Background generators: https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/, https://bgjar.com/, https://app.haikei.app/ <br>
- Web page audits: https://pagespeed.web.dev/, https://lighthouse-metrics.com/
- File Convertor: https://convertio.co/

