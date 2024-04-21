## Parent Resource Playgroup Finder application. 
1. This innovative platform is designed to make life easier for parents in Ottawa by providing an intuitive way to find playgroup information tailored to their needs.
### OR
2. Parent Resource Playgroup Finder is a user-friendly web application that connects parents in Ottawa with playgroup events suited for their children. Utilizing a real-time Google Sheets database, our application offers an interactive map and filterable playgroup cards for a tailored experience.


Our application stands out with its easy-to-use interactive map and a dynamic filtering system that allows users to search for playgroups by location, age group, language preference, date, day, and facility. Data is pulled in real-time from a Google Sheets database, ensuring the most current information is always at hand.

Key features include:
- **Interactive Map**: View playgroup locations across Ottawa, with the option to filter based on various criteria.
- **Real-time Data**: Playgroup information is continuously updated, providing the latest event details.
- **Filter Options**: Search for playgroups by location, age group, language, date, day, or name.
- **Responsive Design**: Whether on desktop or mobile, the experience is seamless.
- **User Location Detection**: With permission, the app will show your location on the map for convenience.
- **Detailed Event Information**: Reactive playgroup cards with detailed event information.
- **Direct Navigation**: Clicking an address takes you to Google Maps to easily find directions.
- **Date Picker**: React DatePicker is integrated for easy date selection.


## Setup

Clone the repository to your local environment:

```bash
git clone [repository-url]
cd [repository-directory]
npm install
npm run dev
```
Navigate to http://localhost:3000 in your browser to view the app.


### Updates:
- add Google Map API
- populate spreadsheet with mock data
- connect spread sheet API
- transform spreadsheet data to a key-object
- create playgroup Cards
- More Info as a link to the web site
- add icons for time, address and age on the Playgroup card
- add icons for parking, WiFi etc.
- add more colums for the playgroups (parking, WiFi - Yes/No logic)
- add additional information in a small pop-up box when a user hovers over icon
- add lattitude and longtitude colums with data (create logic to populate this for the new addresses)
- display markers using geolocation
- display only one marker for the same addresses
- introduce advanced TTLCache for improved performance and reduced API call costs.
- add marker for user location (ask permission)
- center the map on the user location(change it for Ottawa center in cvase user is not from here?)
- add info pop-up box when hover over marker
- create location, language, day and facility filters
- connect all filters to the Markers on the map
- add reset filters button
- add filters by:
 - age (0-18, 18-3, 0-6 ?)
 - daytime (morning, afternoon, evening)
- add "Show All" option to the filters when user chose some(not visible in default state)
- implement cancel logic - if playgroup canceled (add column with Yes/No logic)
- no data found massage
- logic to show playgroups for today and future (no past)
- addres as a link to google map rout
- refactore filters styly (2 rows + responsive)
- add react-datepicker - to filter playgroups by date
- fix date and time logic for EST
- add header text with an image
- make calendar filter as an icon

### Future Development
- fix callendar icon - make it inline in mobile loyaout
- refactore playgroup cards - make them smaller and extend upon press
- hide filters in mobile layaout with 'Show filter options' button
- mobile layaout - map on top, playgroup cards 
- contact form at buttom
- style header text with logo
- geolocation logic - check lng and ltd fot each adress - if its not exist - create one and populate spreadsheet for future use
- use days of the week (monday, tuesdae etc...) to display playgroups that are every week. It will make data shorter. but how to manage cancelations? add culomn 'repetetive' - means playgrop is every week (Yes/No). and use code to count days and display propper day of the week
- French version
- Charts
- Deploy Server?
- Google cloud account for PRC and spreadsheet with propper data
- write an instructions on how to populate data in spreadsheet

- npm install @react-google-maps/api
- npm install react-datepicker <br> 

The Date object in JavaScript uses the local time zone, while the toISOString() method converts the date to UTC time, potentially resulting in a date shift due to the time zone difference.

To fix this, you can adjust the date to account for the time zone offset before converting it to an ISO string.
```Sets the time to midnight for the selected date to avoid any shifts due to the time difference within the day.
Calculates the timezone offset in milliseconds and subtracts it from the date to get the local time as if it were in UTC.
Converts the adjusted date to an ISO string and splits it to get the YYYY-MM-DD format, which should now represent the correct local date.
```

do not forget about```"use client"```!!!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.