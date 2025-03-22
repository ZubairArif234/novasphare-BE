const User = require("../models/User/user");
const SuccessHandler = require("../utils/SuccessHandler");
const ErrorHandler = require("../utils/ErrorHandler");


//register
const register = async (req, res) => {
  // #swagger.tags = ['auth']
  try {
    const { firstName,lastName, email, password } = req.body;
    const user = await User.findOne({ email:email });
    if (user) {
      return ErrorHandler("User already exist with this email.", 400, req, res);
    }

     await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    return SuccessHandler(
      {
        message:"User created successfully",
        signup: true,
      },
      200,
      res
    );
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

//login
const login = async (req, res) => {
  // #swagger.tags = ['auth']

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return ErrorHandler("User does not exist", 400, req, res);
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return ErrorHandler("Invalid credentials", 400, req, res);
    }
   
    jwtToken = user.getJWTToken();
    return SuccessHandler(
      {
        token: jwtToken,
        user,
      },
      200,
      res
    );
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};




const getMe = async (req, res) => {
  // #swagger.tags = ['auth']
  try {
    const user = await User.findById(req.user._id);
    return SuccessHandler(user, 200, res);
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};





module.exports = {
  register,
  login,
  getMe,
};
