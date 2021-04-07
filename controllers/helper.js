const jsonwebtoken = require("jsonwebtoken");

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
            res.json({ jwtToken, user:foundUser });
        }
    );
}

// Set date range of as 1 month
function setDateRange(req) {
    // If no date is selected, set selected date as today
    const filterDate = req.query.date ? new Date(req.query.date) : new Date();
    // Set start date as min 4 hours from today date
    const minStartDate = new Date()
    minStartDate.setTime(minStartDate.getTime() + 4 * 60 * 60 * 1000);
    const startDate = filterDate > minStartDate ? filterDate: minStartDate;
    // Set end date as 30 days from selected date
    const endDate = new Date(filterDate);
    endDate.setDate(filterDate.getDate() + 30);
    return { startDate, endDate };
}

function sortEvents(events) {
    events.sort((eventA, eventB) => {
        return eventA.dateTime - eventB.dateTime;
    });
}


module.exports = { generateJsonToken, setDateRange, sortEvents };
