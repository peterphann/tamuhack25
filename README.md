# Flock
Won second place for overall software hack at TAMUHack 2025. Transform flight delays and cancellations into exciting trips by generating itineraries and gaining access to hotel vouchers and car rentals near you!

> https://flockingawesome.tech

> https://devpost.com/software/flock-ayxf75

## Inspiration
In the United States, approximately 20% of all flights end up either delayed or cancelled entirely. These flight disruptions can lead to missed connections, altered itineraries, and an overall disruption of the travel experience. While many airlines offer reimbursement in these cases, it often involves lots of back and forth and jumping through hoops to reach a satisfying conclusion. As such, we feel that simplifying this process is an absolute necessity, and would benefit both customers and airlines.

## Overview
Flock is a web application that provides travelers with alternative options in the event of a delay or cancellation. It's designed to work in tandem with American Airlines and their Flight Engine API in order to display customer flights and rewards information. In the event of a flight disruption, customers are greeted with three options to remedy their situation: itinerary planning, hotel vouchers, and rental services.

## Tech Stack
Flock utilizes the T3 framework, incorporating Next.js, PostgreSQL, Amazon Web Services RDS, and Prisma to create a comprehensive web application.
* **Frontend:** Next.js was used to drive the frontend and implement our Figma designs. Tailwind CSS was used for styling :). This allowed for ease of routing and rendering of content.
* **Backend:** Next.js was also used for middle tier purposes like opening API endpoints to interface with the deployed American Airlines Flight Engine API, Google Places and Maps API, OpenAI API, car data, and PostgreSQL database. We implemented authentication through Google's sign-in provider with NextAuth.js.
* **Database:** We used AWS Relational Database Service for a shareable cloud-based PostgreSQL database connected through CLI. Prisma acted as an intermediary between the database and the middle tier, allowing for optimized querying.

## Database Schemas

| **Table: `itineraries`** |                      | **Table: `user_flights`**  |                |
|----------------------|--------------------------|-------------------|-------------------------|
| **Column**           | **Type**               | **Column**          | **Type**           |
| `itinerary_id`       | `integer`             | `user_id`           | `text`             |
| `user_id`            | `text`                | `date`              | `text`             |
| `name`               | `character(50)`       | `flight_id`         | `text`             |
| `itinerary_data`     | `json`                | `canceled`          | `boolean`          |
| `date_created`       | `timestamp`           | `id`                | `integer`          |
|         |                       | `voucher_amount`    | `integer`          |

### Indices:
| **Table: `itineraries`**| **Table: `user_flights`**  |
|--------------------|------------------|
|**Primary Key**: `itinerary_id` | **Primary Key**: `id` |

## Challenges
We ran into countless challenges while building Flock. Firstly, there was no unpaid API available to garner hotel rates and car rental rates given an origin location. Thus, we had to do a little web scraping with pagination from the Turo website for car rentals. For the itineraries, we tried to integrate the schedule automatically with Google Calendar. We also had to map an authenticated user session with their respective flights from the PostgreSQL database and pass the flight data between routes.

## Accomplishments
We are super proud of building a all-inclusive application for American Airlines customers to help mitigate stress and confusion in the event of a flight cancelation or delay. This is done by offering services such as a flight management dashboard, one-day itinerary planning and car rentals, and overnight hotel stay vouchers by redeeming American Airlines points. Combining Next.js, authentication, numerous APIs, endpoints, and database, all while maintaining a intuitive and aesthetic interface, was quite challenging given the amount of time we had.

## Takeaways
We learned how to collaborate seamlessly as a team by partitioning tasks and focusing on issues with the greatest dependencies first. This is resemblant of a topological sort where we performed an ordering of what we needed to do. For example, the Flight Engine API data had to be garnered first before we could start pairing authenticated users with their flights. From there, the hotels, cars, and itinerary were all dependent upon the location of the canceled or delayed flight. By following the dependency ordering and dividing tasks, we were able to develop almost all of the features we planned for.

## What's Next?
The main things on the horizon for Flock are incorporating real-time data for hotel rates and car rental rates. Since this is for American Airlines, we would also love to partner with the official API to help customers get real-time updates on hotel, car, and itinerary options.
