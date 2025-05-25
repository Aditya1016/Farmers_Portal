import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Error generating tokens: " + error.message);
  }
};

export const userSignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("New User Created: ", user);

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      const error = new Error("User creation failed");
      error.statusCode = 500;
      throw error;
    }

    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      createdUser,
    });
  } catch (error) {
    next(error);
  }
};

export const userSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordCorrect = bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      const error = new Error("Incorrect password");
      error.statusCode = 401;
      throw error;
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None", 
      maxAge: 24 * 60 * 60 * 1000, 
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "User signed in successfully",
        user: loggedInUser,
      });
  } catch (error) {
    next(error);
  }
};

export const userLogout = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      success: true,
      message: "User logged out successfully",
    });
};

export const setUserLocation = async (req, res, next) => {
    try {
        const { latitude, longitude, id: userId } = req.body
        console.log("Setting user location:", { latitude, longitude, userId });
        if (!userId || latitude == null || longitude == null) {
            return res.status(400).json({ success: false, message: "Missing userId or location data" });
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        user.location = {
            latitude,
            longitude
        }
        await user.save()

        res.status(200).json({ success: true, user: {
            id: user._id,
            name: user.name,
            email: user.email,
            location: user.location
        } })
    } catch (error) {
        next(error)
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}
