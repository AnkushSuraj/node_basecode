import { RESPONSE_CODES } from "../config/constants.js";
import Models from '../modals/index.js';
import queries from "../helpers/queries.js";

const model = Models.Customer;

const check_email_number = async (payload) => {
    try {
        let response = {};
        const query = {
            $or: [
                { email: { $regex: payload.email, $options: 'i' } },
                { phoneNumber: payload.phoneNumber }
            ]
        };
        const projection = { email: 1, password: 1, name: 1 };
        const options = { lean: false };

        const userInfo = await queries.get_data(model, query, projection, options);
        if (userInfo.length != 0) {
            response = {
                status: 1,
                statusCode: RESPONSE_CODES.GET,
                msg: "User info listed successful!!",
                data: userInfo[0]
            };

            return response;
        } else {
            response = {
                status: 0,
                statusCode: RESPONSE_CODES.NOT_FOUND,
                msg: "No user found!!",
            };

            return response
        }
    } catch (err) {
        throw err;
    }
};

const fetchCustomerDetails = async (payload) => {
    try {
        let response = {};
        const query = { _id: payload._id };
        const projection = { __v: 0 };
        const options = { lean: true };
        const populate = [
            {
                path: "created_by",
                select: { name: 1, email: 1, isDeleted: 1 }
            }
        ];

        const customerDetail = await queries.populate_data(model, query, projection, options, populate);
        if (customerDetail.length != 0) {
            response = {
                status: 1,
                statusCode: RESPONSE_CODES.GET,
                msg: "Customer detail successfully listed!!",
                data: customerDetail[0]
            };
            return response
        } else {
            response = {
                status: 1,
                statusCode: RESPONSE_CODES.GET,
                msg: "No customer found!!"
            };
            return response
        }
    } catch (err) {
        throw err;
    }
};

const addCustomer = async (payload) => {
    try {
        let response = {};
        let add_customer = await queries.save_data(model, payload);
        if (add_customer) {
            response = {
                status: 1,
                statusCode: RESPONSE_CODES.POST,
                msg: "Customer successfully added!!",
                data: add_customer
            }
            return response;
        } else {
            response = {
                status: 0,
                statusCode: RESPONSE_CODES.BAD_REQUEST,
                msg: "Something went wrong!!",
                data: add_customer
            }
            return response;
        }
    } catch (err) {
        throw err;
    }
};

const fetchAllCustomers = async (payload) => {
    try {
        let response = {};
        const query = { isDeleted: false };
        const projection = { __v: 0 };
        const options = { lean: true };
        const populate = [
            {
                path: "created_by",
                select: { name: 1, email: 1, isDeleted: 1 },
                options: { lean: true },
                as: "owner" 
            }
        ];

        const customersDetail = await queries.populate_data(model, query, projection, options, populate);
        if (customersDetail.length != 0) {

            response = {
                status: 1,
                statusCode: RESPONSE_CODES.GET,
                msg: "Customers successfully listed!!",
                data: customersDetail
            };
            return response;

        } else {

            response = {
                status: 0,
                statusCode: RESPONSE_CODES.GET,
                msg: "No customer found!!",
            };
            return response;

        }

    } catch (err) {
        throw err;
    }
}

export default {
    check_email_number,
    fetchCustomerDetails,
    addCustomer,
    fetchAllCustomers
};