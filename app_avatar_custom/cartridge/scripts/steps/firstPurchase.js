'use strict';

var Site = require('dw/system/Site');
var Logger = require('dw/system/Logger');
var Status = require('dw/system/Status');
var Transaction = require('dw/system/Transaction');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var BasketMgr = require('dw/order/BasketMgr');

var OrderAddress = require('dw/order/OrderAddress');
var ArrayList = require('dw/util/ArrayList');
var HashMap = require('dw/util/HashMap');
var StringUtils = require('dw/util/StringUtils');

var Order = require('dw/order/Order');
var OrderHistory = require('dw/customer/OrderHistory');
var OrderMgr = require('dw/order/OrderMgr');

var Customer = require('dw/customer/Customer');
var CustomerMgr = require('dw/customer/CustomerMgr');
var Profile = require('dw/customer/Profile');
var CustomerAddress = require('dw/customer/CustomerAddress');

const validateFirstPurchase = (params, customerData) => {
  let { customerNo, customerEmail } = params;
  let activeData = customerData.activeData;
  let countOrders = customerData.orderHistory.orders.count;

  if (customerNo) {
    let customer = CustomerMgr.searchProfile(
      `customerNo='${customerNo}'`,
      Profile
    ).getCustomer();

    Transaction.wrap(function () {
      let countOrders = customer.getOrderHistory().getOrderCount();

      if (countOrders > 0) {
        customer.getCustom().first_purchase = true;
      }
    });
  } else {
    Transaction.wrap(function () {
      if (count > 0) {
        activeData.getCustom().first_purchase = true;
      }
    });
  }
};

module.exports.validateFirstPurchase = validateFirstPurchase;

module.exports.execute = () => {
  let customer = CustomerMgr.searchProfile("customerNo='00003001'", Profile);

  Transaction.wrap(function () {
    let countOrders = customer.getCustomer().getOrderHistory().getOrderCount();

    if (countOrders > 0) {
      customer.getCustom().first_purchase = true;
    }
  });

  Logger.info('Pending orders found: {0}', customer);

  return new Status(Status.OK, 'OK', 'Updated orders successfully');
};
