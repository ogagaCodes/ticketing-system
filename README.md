# Event Ticket Booking System

## Overview
The Event Ticket Booking System is a Node.js application designed to manage event ticket bookings efficiently. It allows users to book tickets for various events, handle cancellations, and manage a waiting list when tickets are sold out. The application is built using **Express.js**, adheres to RESTful API principles, and follows best practices in error handling, concurrency management, and Test-Driven Development (TDD).

## Features
- **Event Initialization**: Initialize events with a specified number of available tickets.
- **Concurrent Booking**: Users can book tickets simultaneously, with thread-safety ensured for all operations.
- **Waiting List Management**: Users are added to a waiting list when tickets are sold out, and tickets are automatically assigned to waiting list users upon cancellations.
- **Real-Time Status Updates**: Retrieve the current status of an event, including available tickets and waiting list count.
- **Comprehensive Error Handling**: Meaningful error messages are provided for various edge cases.
- **In-Memory and RDBMS Support**: Data can be managed using in-memory storage or an RDBMS.

## API Endpoints
The application exposes the following RESTful API endpoints:

1. **Initialize Event**
   - **Endpoint**: `POST /initialize`
   - **Description**: Initializes a new event with a given number of tickets.
   - **Request Body**:
     ```json
     {
       "eventId": "string",
       "ticketsAvailable": "number"
     }
     ```

2. **Book Ticket**
   - **Endpoint**: `POST /book`
   - **Description**: Books a ticket for a user. If sold out, the user is added to the waiting list.
   - **Request Body**:
     ```json
     {
       "eventId": "string",
       "userId": "string"
     }
     ```

3. **Cancel Booking**
   - **Endpoint**: `POST /cancel`
   - **Description**: Cancels a booking for a user. If there’s a waiting list, the ticket is automatically assigned to the next user.
   - **Request Body**:
     ```json
     {
       "eventId": "string",
       "userId": "string"
     }
     ```

4. **Event Status**
   - **Endpoint**: `GET /status/:eventId`
   - **Description**: Retrieves the current status of an event, including available tickets and waiting list count.
   - **Response**:
     ```json
     {
       "eventId": "string",
       "availableTickets": "number",
       "waitingListCount": "number"
     }
     ```

## Documentation
API documentation is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) and is generated using **Swagger UI** for easy access and understanding of the available endpoints.

## Installation and Usage
To run the application locally, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- (Optional) [Docker](https://www.docker.com/) if you wish to run the application in a container

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/event-ticket-booking-system.git
   cd event-ticket-booking-system
   yarn install
   yarn run start:dev


### Running Via Docker
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/event-ticket-booking-system.git
   cd event-ticket-booking-system
   docker build -t event-ticket-booking-system .
   docker run -p 3000:3000 event-ticket-booking-system

### Testing
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/event-ticket-booking-system.git
   cd event-ticket-booking-system
   yarn run test

### Debugging
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/event-ticket-booking-system.git
   cd event-ticket-booking-system
   yarn run debug:test
   open https://nodejs.org/en/docs/inspector (you will find the debugger here)

