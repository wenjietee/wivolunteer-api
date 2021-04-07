const jsonwebtoken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const moment = require("moment");

// Generate Json Web Token with user details
function generateJsonToken(foundUser, res) {
    // Set payload for json web token
    const user = {
        _id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
    };
    // Generate json web token and send to front end
    jsonwebtoken.sign(
        user,
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRE_TIME },
        (err, jwtToken) => {
            res.json({ jwtToken, user: foundUser });
        }
    );
}

// Set date range of as 1 month
function setDateRange(req) {
    // If no date is selected, set selected date as today
    const filterDate = req.query.date ? new Date(req.query.date) : new Date();
    // Set start date as min 4 hours from today date
    const minStartDate = new Date();
    minStartDate.setTime(minStartDate.getTime() + 4 * 60 * 60 * 1000);
    const startDate = filterDate > minStartDate ? filterDate : minStartDate;
    // Set end date as 30 days from selected date
    const endDate = new Date(filterDate);
    endDate.setDate(filterDate.getDate() + 30);
    return { startDate, endDate };
}

// Sort array of events by dateTime
function sortEvents(events) {
    events.sort((eventA, eventB) => {
        return eventA.dateTime - eventB.dateTime;
    });
}

// Create function to send cancellation and update email to participants
async function updateNotify(event) {
    // Not sending email if no participant or interested users
    if (!event.participants.length && !event.interested.length) {
        return
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "noreply.wivolunteer@gmail.com",
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const userEmails = event.participants.map(user => user.email);
    // console.log(userEmails);
    // Make function for general for update and cancel message;
    const updateType = (event.isCancelled) ? "Cancelled" : "Updated";

    const mailOptions = {
        from: "WiVolunteer <do-not-reply@wivolunteer.com>",
        to: "noreply.wivolunteer@gmail.com",
        bcc: userEmails,
        subject: `WiVolunteer - Event ${updateType}`,
        html: `<head>
        <style>
            updated-type {
                text-transform: lowercase;
                font-weight: bold;
            }      
        </style>
        </head>
        <body>
            <p>Hi</p>
            <p>Please be informed that the following event that you have signed up has been <span id="updated-type">${updateType} <span> by organiser</p>
            <ul>
                <li>Event Title: ${event.eventTitle}</li>
                <li>Date: ${moment(event.dateTime).format("ddd, DD MMM YYYY")} </li>
                <li>Time: ${moment(event.dateTime).format("LT")}</li>
                <li>Location: ${event.location} </li>
                <li>Organiser: ${event.organiser.username} </li>
            </ul>
            <p>Please find more events to join <a href="https://wivolunteer.herokuapp.com/">here</a></p>
            <footer>(This is an auto-generated message. Please do not reply directly to email).</footer>
            </footer>
        </body>`,
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { generateJsonToken, setDateRange, sortEvents, updateNotify };
