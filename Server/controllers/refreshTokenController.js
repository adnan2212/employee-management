const User = require("../model/User");
const jwt = require("jsonwebtoken");

const path = require("path");

// const handleRefreshToken = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) {
//     return res.sendStatus(401); //Unauthorized
//   }
//   const refreshToken = cookies.jwt;

//   const foundUser = await User.findOne({ refreshToken }).exec();
//   if (!foundUser) {
//     return res.sendStatus(403); //Forbidden
//   }
//   //evaluate jwt
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//     if (err || foundUser.username !== decoded.username) {
//       return res.sendStatus(403);
//     }
//     const roles = Object.values(foundUser.roles);
//     const accessToken = jwt.sign(
//       {
//         UserInfo: {
//           username: decoded.username,
//           roles: roles,
//           id: foundUser._id,
//         },
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "1h" }
//     );
//     res.json({ accessToken });
//   });
// };

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  // if (!foundUser) return res.sendStatus(401);
  if (!foundUser) {
    return res.sendStatus(403); //Forbidden
  }
  console.log("====================");
  console.log(foundUser);
  console.log("====================");
  //evalute the jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.UserInfo.username) {
      console.log("🆑ERROR: =>", err);
      console.log("💚", foundUser.username);
      console.log("✅", decoded.UserInfo._id);
      // return res.sendStatus(403); //Forbidden
      return res.status(403).json({ message: "Somthing broke!!!" }); //Forbidden
    }

    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ roles, accessToken });
  });
};

module.exports = { handleRefreshToken };
