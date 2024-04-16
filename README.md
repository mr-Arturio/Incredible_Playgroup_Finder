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


introduce advanced TTLCache for improved performance and reduced API call costs.

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