const User = require("../models/User");
const generateToken = require("../config/jwt");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ error: "Invalid password or not existing email." });
    }

    const token = await generateToken(user);
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = loginUser;
 