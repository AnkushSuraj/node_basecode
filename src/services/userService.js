import Models from '../modals/index.js';
import queries from "../helpers/queries.js";
import { RESPONSE_CODES } from "../config/constants.js";

const model = Models.User;


const check_email = async (payload) => {
    try {
        let response = {}
        const query = { email: payload };
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
}

const addUser = async (payload) => {
    try {
        let response = {};
        const add_user = await queries.save_data(model, payload);
        if (add_user) {
            response = {
                status: 1,
                statusCode: RESPONSE_CODES.POST,
                msg: "Registered Successfully!!",
                data: add_user
            }
            return response;
        } else{
            response = {
                status: 0,
                statusCode: RESPONSE_CODES.POST,
                msg: "Something went wrong!!",
                data: add_user
            }
            return response;
        }
    } catch (err) {
        throw err;
    }
}

const fetchAllUsers = async (payload) => {
    try {
        let response = {};
        const query = { isDeleted: false };
        const projection = { __v: 0 };
        const options = { lean: true };

        const users = await queries.get_data(model, query, projection, options);
        if (users.length != 0) {

            response = {
                status: 1,
                statusCode: RESPONSE_CODES.GET,
                msg: "Users listed successful!!",
                data: users
            };
            return response

        } else {

            response = {
                status: 0,
                statusCode: RESPONSE_CODES.GET,
                msg: "No user found!!",
            };
            return response

        }

    } catch (err) {
        throw err;
    }
}

export default {
    check_email,
    addUser,
    fetchAllUsers
};