import User from "../models/user.model.js";

export const setUserLocation = async (req, res, next) => {
  try {
    const { latitude, longitude, id: userId } = req.body;
    console.log("Setting user location:", { latitude, longitude, userId });
    if (!userId || latitude == null || longitude == null) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or location data" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.location = {
      latitude,
      longitude,
    };
    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
      },
    });
  } catch (error) {
    next(error);
  }
};

