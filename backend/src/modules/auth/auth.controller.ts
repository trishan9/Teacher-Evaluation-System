import AuthService from "./auth.service";

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const avatar = req.file?.path;
  try {
    await AuthService.signup(name, email, password, avatar);
    res.json({
      success: true,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthService.login(email, password);
    res.json({
      success: true,
      user,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await AuthService.getMe(res.locals.user._id);
    res.json({
      success: true,
      user,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

export default { login, signup, getMe };
