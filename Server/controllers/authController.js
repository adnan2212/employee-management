const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({ error: "Missing user or password" });

  const foundUser = usersDB.users.find((person) => person.username === user);
  // if (!foundUser) return res.sendStatus(401);
  if (!foundUser) {
    return res.status(401).json({ error: "Unauthorized line 16" });
  }
  //evalute the password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    //set the cookie
    // res.cookie("user", user, { httpOnly: true });

    //create JWTs
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //saving the refresh token with current user
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "../model/users.json"),
      JSON.stringify(usersDB.users)
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });
    res.json({ accessToken });
    // res.status(200).json({ success: `Welcome ${user}!` });
  } else {
    res.status(401).json({ error: "Unauthorized line 29" });
  }
};

module.exports = { handleLogin };
