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
            res.json({ jwtToken, user });
        }
    );
}

// Set date range of as 1 month
function setDateRange(req) {
    // If no date is selected, set selected date as today
    const filterDate = req.query.date || new Date();
    const startDate = new Date();
    startDate.setDate(filterDate.getDate() + 1);
    const endDate = new Date();
    endDate.setDate(filterDate.getDate() + 30);
    return { startDate, endDate };
}

module.exports = { generateJsonToken, setDateRange };
