import { RESPONSE_CODES } from "../config/constants.js";
import customerService from "../services/customerService.js";
import { generateToken, refreshToken } from '../helpers/auth.js';


const addCustomer = async (req, res) => {
  try {
    const body = req.body
    let response = {};
    let payload = {
      name: body.name,
      email: body.email,
      password: body.password,
      country_code: body.country_code,
      phoneNumber: body.phoneNumber,
      created_by: req.user._id
    }
    const check_email_number = await customerService.check_email_number(payload);
    if (!check_email_number.status) {

      const addCustomer = await customerService.addCustomer(payload);
      if (addCustomer.status) {
        response = {
          status: addCustomer.status,
          statusCode: addCustomer.statusCode,
          msg: addCustomer.msg,
        }
        return res.status(RESPONSE_CODES.POST).json(response);

      } else {
        response = {
          status: addCustomer.status,
          statusCode: addCustomer.statusCode,
          msg: addCustomer.msg,
        }
        return res.status(RESPONSE_CODES.POST).json(response);
      }


    } else {
      response = {
        status: 0,
        statusCode: RESPONSE_CODES.ALREADY_EXIST,
        msg: "Email or PhoneNumber is already exists!!"
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
}

const fetchCustomerDetails = async (req, res) => {
  try {

    const body = req.query
    let response = {};

    const customerInfo = await customerService.fetchCustomerDetails(body);

    if (customerInfo.status) {
      response = {
        status: customerInfo.status,
        statusCode: customerInfo.statusCode,
        msg: customerInfo.msg,
        data: customerInfo.data
      };

      return res.status(RESPONSE_CODES.GET).json(response);
    } else {

      response = {
        status: customerInfo.status,
        statusCode: customerInfo.statusCode,
        msg: customerInfo.msg,
      };

      return res.status(RESPONSE_CODES.ERROR,).json(response);
    }

  } catch (err) {
    return res.status(RESPONSE_CODES.ERROR).json({
      status: 0,
      status_code: RESPONSE_CODES.ERROR,
      msg: err.toString()
    });
  };
}

const fetchAllCustomers =  async (req, res) => {
  try {
    let response = {};

    const customerInfo = await customerService.fetchAllCustomers();

    if (customerInfo.status) {
      response = {
        status: customerInfo.status,
        statusCode: customerInfo.statusCode,
        msg: customerInfo.msg,
        data: customerInfo.data
      };

      return res.status(RESPONSE_CODES.GET).json(response);
    } else {

      response = {
        status: customerInfo.status,
        statusCode: customerInfo.statusCode,
        msg: customerInfo.msg,
      };

      return res.status(RESPONSE_CODES.ERROR,).json(response);
    }
  } catch (error) {
    return res.status(RESPONSE_CODES.ERROR).json({
      status: 0,
      status_code: RESPONSE_CODES.ERROR,
      msg: error.toString()
    });
  }
}

export default {
  addCustomer,
  fetchCustomerDetails,
  fetchAllCustomers
};