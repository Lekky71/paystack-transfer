# paystack-transfer  [![Build Status](https://travis-ci.org/Lekky71/paystack-transfer.svg?branch=master)](https://travis-ci.org/Lekky71/paystack-transfer)
A NodeJs module for performing transfers from your Paystack account to Nigerian banks

# Installation
    npm install --save paystack-transfer

# Usage
    var paystackTransfer = require('paystack-transfer')(YOUR_SECRET_KEY)
    All methods are promisified but you can also use callback(error, result) as the last argument(optional) in the method call

##### Create a transfer recipient
    paystackTransfer.createRecipient(name, description, account_number, bank, metadata)
                .then(function(body){
                    ...
                })
                .catch(function(error){
                    return done(error);
                });


##### Return a list of all recipients
    paystackTransfer.listRecipients()
                    .then(function(body){
                        ...
                        done();
                    })
                    .catch(function(error){
                        return done(error);
                    });


##### Initiate a transfer
    paystackTransfer.initiateSingle(source, reason, amount, recipient)
                    .then(function(body){
                        ...
                        done();
                    })
                    .catch(function(error){
                        return done(error);
                    });

##### Fetch a transfer by its code
    paystackTransfer.fetchTransfer(code)
                        .then(function(body){
                            ...
                            done();
                        })
                        .catch(function(error){
                            return done(error);
                        });


##### List all your transfers
    paystackTransfer.listTransfers()
                        .then(function(body){
                            ...
                            done();
                        })
                        .catch(function(error){
                            return done(error);
                        });

##### Finalize a transfer
    paystackTransfer.finalize(transfer_code, otp)
                        .then(function(body){
                            ...
                            done();
                        })
                        .catch(function(error){
                            return done(error);
                        });


##### Initiate bulk transfer
    paystackTransfer.initiateBulk(source, transfers)
                        .then(function(body){
                            ...
                            done();
                        })
                        .catch(function(error){
                            return done(error);
                        });

##### Check your Paystack account balance
    paystackTransfer.checkBalance()
                        .then(function(body){
                            ...
                            done();
                        })
                        .catch(function(error){
                            return done(error);
                        });

##### Resend OTP for a particular transaction to phone number
    paystackTransfer.resendOtp(transfer_code)
                        .then(function(body){
                            ...
                            done();
                        })
                        .catch(function(error){
                            return done(error);
                        });


##### Disable OTP for future transfers
    paystackTransfer.disableOtp(otp)
                        .then(function(body){
                            ...
                            done();
                        })
                        .catch(function(error){
                            return done(error);
                        });


##### Finalize disabling of OTP
    paystackTransfer.finalizeOtpDisable()
                        .then(function(body){
                            ...
                            done();
                        })
                        .catch(function(error){
                            return done(error);
                        });


##### Enable OTP
    paystackTransfer.enableOtp()
                        .then(function(body){
                            ...
                            done();
                        })
                        .catch(function(error){
                            return done(error);
                        });

# Test
To run tests, add your Paystack test secret key to package.json. (The test line should look something like this: env KEY=sk_test_1as690gfids3ug34fgd0770ds3df88 ./node_modules/.bin/mocha...). Now run:

    npm test
If you want to contribute, also update the corresponding test function and make sure it is working.




