

const router = require("express").Router();

const {
  register,
  login,
  forgotpassword,
  resetpassword,
  registerStaff,
  get,
  getById,
  updateById,
  deleteById,
  notifyUser,
} = require("../controllers/auth");

//bellow routes map the controllers
router.route("/register").post(register); // call the auth in controllers

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/notifyuser").post(notifyUser);

router.route("/passwordreset/:resetToken").put(resetpassword);

router.route("/registerStaff").post(registerStaff);

router.route("/").get(get);

router.route("/get/:id").get(getById);

router.route("/update/:id").put(updateById);

router.route("/delete/:id").delete(deleteById);

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Example: find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Add your password check logic here (bcrypt etc.)
    const passwordMatches = password === user.password; // replace with proper hash check
    if (!passwordMatches) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
