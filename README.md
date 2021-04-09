# WiVolunteer-API

## Collaborators

- [Jess Toh](https://github.com/jesstoh/)
- [Tee Wenjie](https://github.com/wenjietee/)

---

## About the API

---

The WiVolunteer-API is a secured API that processes requests from the WiVolunteer App.

## App Links

---

[WiVolunteer App](https://wivolunteer.herokuapp.com/)

- Frontend

[WiVolunteer API](https://wivolunteer-api.herokuapp.com/)

- Backend

## Related Links

---

[WiVolunteer App Architecture](https://github.com/jesstoh/wivolunteer-app)

- A full documentation of the WiVolunteer app from conceptualisation to production.

[WiVolunteer App](https://github.com/jesstoh/wivolunteer)

- WiVolunteer Frontend README

## Technologies Used:

---

Server

- CORS (Cross Origin Resource Sharing)

- ExpressJS

Authentication

- JSON Web Token
- bcrypt
- Express-JWT

Other Libraries

- MomentJS (Date/Time)
- Mongoose (MongoDB ODM)
- Nodemailer (Email Notifications)

## Database

---

- MongoDB (Database)
- Cloudinary (Image Storage)

## RESTful ROUTES

---

| #   | MODEL/CONTROLLER | ACTION  | URL                          | HTTP VERB | DESCRIPTION                                                    |
| --- | :--------------: | :-----: | ---------------------------- | :-------: | -------------------------------------------------------------- |
| 1   |      users       | Create  | /users                       |   POST    | Create new user                                                |
| 2   |      users       | Update  | /users/profile               |    PUT    | Update User profile                                            |
| 3   |      users       |  Show   | /users/profile               |    GET    | Getting user profile data                                      |
| 4   |  authentication  | Create  | /login                       |   POST    | New login with sending json web token to front-end             |
| 5   |  authentication  |   Get   | /users/authenticate          |    GET    | Route to authenticate when componentDidMount                   |
| 6   |  authentication  | Destroy | /logout                      |  DELETE   | Logout - remove local storage json token                       |
| 7   |      users       |  index  | /users/events                |    GET    | Event repo for current user                                    |
| 8   |      events      |  Index  | /events?date=" "             |    GET    | Show events of intererest with start date as Date.now()        |
| 9   |      events      |  Index  | /events/all?date=" "         |    GET    | Show all events starting from this date, all cat or search cat |
| 10  |      events      |  Index  | /events/find/?cat=""&date="" |    GET    | Filter Events for search                                       |
| 11  |      events      | Destroy | /events/:id                  |  DELETE   | Delete event if no user join or show interest                  |
| 12  |      events      |  Show   | /events/:id                  |    GET    | Show individual event page based on event status               |
| 13  |      events      | Create  | /events                      |   POST    | Create a new event                                             |
| 14  |      events      | Update  | /events/:id/edit             |    PUT    | Update event details                                           |
| 15  |      events      | Update  | /events/:id/join             |    PUT    | Add participant                                                |
| 16  |      events      | Update  | /events/:id/drop             |    PUT    | Remove participant                                             |
| 17  |      events      | Update  | /events/:id/interested       |    PUT    | Add participant to event interested array                      |
| 18  |      events      | Update  | /events/:id/uninterested     |    PUT    | Remove participant from event interested array                 |
| 19  |     feedback     |  Index  | /feedback/:id                |    GET    | Fetch feedback info for the event                              |
| 20  |     feedback     | Create  | /feedback/:id                |   POST    | Create a new feedback for the event                            |
