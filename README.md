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

