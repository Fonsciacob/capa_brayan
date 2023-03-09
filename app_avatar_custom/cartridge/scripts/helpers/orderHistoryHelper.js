'use strict';

var Order = require('dw/order/Order');
var OrderHistory = require('dw/customer/OrderHistory');
var OrderMgr = require('dw/order/OrderMgr');

var Customer = require('dw/customer/Customer');
var CustomerMgr = require('dw/customer/CustomerMgr');
var Profile = require('dw/customer/Profile');

const firstPurchase = ({ customerNO }) => {
  var customer = CustomerMgr.searchProfile("customerNo='00003001'", Profile);
  var getEmail = customer.getEmail();
  var getCustomer = customer.getCustomer();

  var customerOrder = CustomerMgr.getCustomerByCustomerNumber(
    `"ID='${getCustomer.getID()}'"`
  );

  //var getData = customerOrder.getID();

  return getCustomer.getOrderHistory().getOrderCount();
};

module.exports = {
  firstPurchase: firstPurchase,
};
