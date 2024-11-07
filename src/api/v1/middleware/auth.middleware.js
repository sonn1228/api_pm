import { verifyToken } from "../../../utils/jwt.js";
import { errorResponse } from "../../../helpers/response.js";
import UserModel from "../../../models/user.model.js";
import Blacklist from "../../../models/blacklist.model.js";

class AuthMiddleware {
  requiredAuth = async (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      errorResponse(res, 401, "Token not provided");
      return;
    }

    try {
      const blacklist = await Blacklist.findOne({
        token: accessToken,
      });
      if (blacklist) {
        errorResponse(res, 500, "Unauthorized");
        return;
      }

      const decoded = verifyToken(accessToken);
      if (!decoded) {
        errorResponse(res, 401, "Invalid token");
        return;
      }

      const userId = decoded.userId;
      const exp = decoded.exp;
      const user = await UserModel.findOne({ _id: userId });

      if (!user) {
        errorResponse(res, 401, "Unauthorized");
        return;
      }

      req.user = {
        ...user.toObject(),
        exp,
        accessToken,
      };

      next();
    } catch (error) {
      console.error("Error in AuthMiddleware:", error);
      errorResponse(res, 401, "Authorization error");
    }
  };
}

export default new AuthMiddleware();
