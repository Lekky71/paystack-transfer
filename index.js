var path = require('path');
var request = require('request');
var allBanks = require('./resources/all-banks');
var Promise = require('promise');


var root = 'https://api.paystack.co';

function PaystackTransfer(key) {
    if (!(this instanceof PaystackTransfer)) {
        return new PaystackTransfer(key);
    }

    this.key = key;
    //TRANSFER RECIPIENTS
    PaystackTransfer.prototype.createRecipient = function (name, description, account_number, bank, metadata, callback) {
        var options = {
            url: [root, "/transferrecipient"].join(''),
            json: true,
            method: 'POST',
            headers: {
                'Authorization': ['Bearer ', this.key].join('')
            },
            body: {
                type: "nuban",
                name: name,
                description: description,
                account_number: account_number,
                bank_code: bank.code,
                currency: "NGN",
                metadata: metadata
            }
        };
        return this.requestHandler(options, callback);

    };


    PaystackTransfer.prototype.listRecipients = function (callback) {
        var options = {
            url: [root, "/transferrecipient"].join(''),
            method: 'GET',
            json: true,
            headers: {
                'Authorization': ['Bearer ', this.key].join('')
            }
        };
        return this.requestHandler(options, callback)
    };

    //TRANSFERS
    PaystackTransfer.prototype.initiateSingle = function (source, reason, amount, recipient, callback) {
        var options = {
            url: [root, "/transfer"].join(''),
            json: true,
            method: 'POST',
            headers: {
                'Authorization': ['Bearer ', this.key].join('')
            },
            body: {
                source: source,
                reason: reason,
                amount: amount,
                recipient: recipient
            }
        };
        return this.requestHandler(options, callback);
    };

    PaystackTransfer.prototype.listTransfers = function (callback) {
        var options = {
            url: [root, "/transfer"].join(''),
            method: 'GET',
            json: true,
            headers: {
                'Authorization': ['Bearer ', this.key].join('')
            }
        };
        return this.requestHandler(options, callback)
    };

    PaystackTransfer.prototype.fetchTransfer = function (code, callback) {
        var options = {
            url: [root, "/transfer/", code.toString()].join(''),
            method: 'GET',
            json: true,
            headers: {
                'Authorization': ['Bearer ', this.key].join('')
            }
        };
        return this.requestHandler(options, callback)
    };

    PaystackTransfer.prototype.finalize = function (transfer_code, otp, callback) {
        var options = {
            url: [root, "/transfer/finalize_transfer"].join(''),
            json: true,
            method: 'POST',
            headers: {
                'Authorization': ['Bearer ', this.key].join('')
            },
            body: {
                transfer_code: transfer_code,
                otp: otp
            }
        };
        return this.requestHandler(options, callback);
    };

    PaystackTransfer.prototype.initiateBulk = function (source, transfers, callback) {
        var options = {
            url: [root, "/transfer"].join(''),
            json: true,
            method: 'POST',
            headers: {
                'Authorization': ['Bearer ', this.key].join(''),
                'Content-Type': 'application/json'
            },
            body: {
                currency: "NGN",
                source: source,
                transfers: JSON.stringify(transfers)
            }
        };
        return this.requestHandler(options, callback);
    };

    //TRANSFER CONTROLS
    PaystackTransfer.prototype.checkBalance = function (callback) {
        var options = {
            url: [root, "/balance"].join(''),
            method: 'GET',
            json: true,
            headers: {
                'Authorization': ['Bearer ', this.key].join('')
            }
        };
        return this.requestHandler(options, callback);
    };

    PaystackTransfer.prototype.resendOtp = function (transfer_code, callback) {
        var options = {
            url: [root, "/transfer/resend_otp"].join(''),
            json: true,
            method: 'POST',
            headers: {
                'Authorization': ['Bearer ', this.key].join('')
            },
            body: {
                transfer_code: transfer_code
            }
        };
        return this.requestHandler(options, callback);
    };

    PaystackTransfer.prototype.disableOtp = function (callback) {
        var options = {
            url: [root, "/transfer/disable_otp"].join(''),
            json: true,
            method: 'POST',
            headers: {
                'Authorization': ['Bearer ', this.key].join('')
            }
        };
        return this.requestHandler(options,callback);
    };

    PaystackTransfer.prototype.finalizeOtpDisable = function (otp, callback) {
        var options = {
            url: [root, "/transfer/disable_otp_finalize"].join(''),
            json: true,
            method: 'POST',
            headers: {
                'Authorization': ['Bearer ', this.key].join('')
            },
            body: {
                otp: otp
            }
        };
        return this.requestHandler(options, callback);
    };

    PaystackTransfer.prototype.enableOtp = function (callback) {
        var options = {
            url: [root, "/transfer"].join(''),
            json: true,
            method: 'POST',
            headers: {
                'Authorization': ['Bearer ', this.key].join('')
            },
            body: {}
        };
        return this.requestHandler(options, callback);
    };

    PaystackTransfer.prototype.requestHandler = function (options, callback) {
        return new Promise( function(fulfill, reject) {
            request(options, function(error, response, body) {
                if (error) reject(error);
                else if (!body.status) {
                    error = body;
                    body = null;
                    reject(error);
                }
                else {
                    fulfill(body);
                }
            });
        }).then( function(value) {
            if (callback) {
                return callback(null, value);
            }
            return value;
        }).catch(function(reason){
            if (callback) {
                return callback(reason, null);
            }
            return reason;
        });
    }

}

module.exports = PaystackTransfer;