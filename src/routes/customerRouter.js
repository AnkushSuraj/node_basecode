import express from 'express';
import customerController from '../controllers/customerController.js';
import { addCustomerValidator, customerDetailValidator } from '../validators/customerValidator.js';

const router = express.Router();

router.post('/addCustomer', addCustomerValidator, customerController.addCustomer);
router.get('/customerDetail', customerDetailValidator, customerController.fetchCustomerDetails);
router.get('/fetchAllCustomers', customerController.fetchAllCustomers);


export default router;