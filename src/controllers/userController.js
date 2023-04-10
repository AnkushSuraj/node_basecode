import { RESPONSE_CODES } from "../config/constants.js";
import userService from "../services/userService.js";
import { generateToken, refreshToken } from '../helpers/auth.js';

const register = async (req, res) => {
  try {
    const body = req.body;
    let response = {};

    const userInfo = {
      name: body.name,
      email: body.email,
      password: body.password
    };

    const check_email = await userService.check_email(userInfo.email);

    if (!check_email.status) {

      const save_data = await userService.addUser(userInfo);
      if (save_data.status) {
        const token = await generateToken(userInfo);

        response = {
          status: save_data.status,
          statusCode: save_data.statusCode,
          msg: save_data.msg,
          token: token
        };

        return res.status(RESPONSE_CODES.POST).json(response);
      } else{
        response = {
          status: save_data.status,
          statusCode: save_data.statusCode,
          msg: save_data.msg
        };

        return res.status(RESPONSE_CODES.POST).json(response);
      }

    } else {
      response = {
        status: 0,
        statusCode: RESPONSE_CODES.ALREADY_EXIST,
        msg: "Email is already exists"
      };
      return res.status(RESPONSE_CODES.ALREADY_EXIST).json(response);
    }
  } catch (err) {
    return res.status(RESPONSE_CODES.ERROR).json({
      status: 0,
      status_code: RESPONSE_CODES.ERROR,
      msg: err.toString()
    });
  }
};

const login = async (req, res) => {
  try {

    const body = req.body;
    let response = {};

    let check_email = await userService.check_email(body.email);
    if (check_email.status) {
      if (check_email.data.password == body.password) {

        const tokenData = {
          _id: check_email.data._id,
          name: check_email.data.name,
          email: check_email.data.email
        }
        const token = await refreshToken(tokenData);

        response = {
          status: 1,
          statusCode: RESPONSE_CODES.POST,
          msg: "Login Successfully",
          token: token
        };

        res.status(RESPONSE_CODES.ERROR).json(response);
      } else {

        response = {
          status: 0,
          statusCode: RESPONSE_CODES.ERROR,
          msg: "Incorrect password"
        };

        res.status(RESPONSE_CODES.ERROR).json(response);
      }

    } else {

      response = {
        status: 0,
        statusCode: RESPONSE_CODES.ERROR,
        msg: "Invalid email"
      }

      res.status(RESPONSE_CODES.ERROR).json(response);
    }
  } catch (err) {
    return res.status(RESPONSE_CODES.ERROR).json({
      status: 0,
      status_code: RESPONSE_CODES.ERROR,
      msg: err.toString()
    });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    let response = {};
    const usersDetail = await userService.fetchAllUsers();
    if (usersDetail.status) {
      response = {
        status: usersDetail.status,
        statusCode: usersDetail.statusCode,
        msg: usersDetail.msg,
        data: usersDetail.data
      };
      return res.status(RESPONSE_CODES.GET).json(response);

    } else {
      response = {
        status: usersDetail.status,
        statusCode: usersDetail.statusCode,
        msg: usersDetail.msg
      };
      return res.status(RESPONSE_CODES.GET).json(response);
    }

  } catch (err) {
    return res.status(RESPONSE_CODES.ERROR).json({
      status: 0,
      status_code: RESPONSE_CODES.ERROR,
      msg: err.toString()
    });
  }
};


export default {
  register,
  login,
  fetchAllUsers
}