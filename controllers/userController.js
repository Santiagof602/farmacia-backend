const { User } = require("../models");

const { User } = require("../models");
const bcrypt = require("bcrypt");

// Get all users
async function index(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const users = await User.findAndCountAll({
      limit,
      offset,
      attributes: { exclude: ["password"] }
    });

    return res.json({
      users: users.rows,
      total: users.count,
      currentPage: page,
      totalPages: Math.ceil(users.count / limit)
    });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving users" });
  }
}

// Get single user
async function show(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }
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
    const { firstname, lastname, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      role: role || "user"
    });

    const userWithoutPassword = await User.findByPk(user.id, {
      attributes: { exclude: ["password"] }
    });

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
}

// Update user
async function update(req, res) {
  try {
    const { firstname, lastname, email, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({
      firstname: firstname || user.firstname,
      lastname: lastname || user.lastname,
      email: email || user.email,
      role: role || user.role
    });

    const updatedUser = await User.findByPk(user.id, {
      attributes: { exclude: ["password"] }
    });

    return res.json(updatedUser);
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

    await user.destroy(); // Soft delete because paranoid is true

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

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
