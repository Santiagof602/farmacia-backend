const { User } = require("../models");


// Get all users
async function index(req, res) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving users" });
  }
}

// Get single user
async function show(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving user" });
  }
}

// Create user
async function store(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
    });
    return res.status(201).json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
}

// Update user
async function update(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update(req.body);
    return res.json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating user" });
  }
}

// Delete user
async function destroy(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user" });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
