## PerentResource
project
initial

## Getting Started

First, run the development server:

```bash
npm run dev
```

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

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
