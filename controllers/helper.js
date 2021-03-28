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
        { expiresIn: "1d" },
        (err, jwtToken) => {
            res.json({ jwtToken, user });
        }
    );
}

module.exports = { generateJsonToken };
