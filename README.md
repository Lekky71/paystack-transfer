# paystack-transfer  [![Build Status](https://travis-ci.org/Lekky71/paystack-transfer.svg?branch=master)](https://travis-ci.org/Lekky71/paystack-transfer)
A NodeJs module for performing transfers from your Paystack account to Nigerian banks

# Installation
    npm install --save paystack-transfer

# Usage
    var PaystackTransfer = require('paystack-transfer')(YOUR_SECRET_KEY)
    var allBanks = PaystackTransfer.all_banks;

    All methods are promisified but you can also use callback(error, result)
    as the last argument(optional) in the method call

### Bank object
    A bank object is for example is :

    first_bank_of_nigeria: {
        "name": "First Bank of Nigeria",
        "slug": "first-bank-of-nigeria",
        "code": "011",
        "longcode": "011151003",
        "gateway": "etz"
    }


##### Create a transfer recipient
    PaystackTransfer.createRecipient(name, description, account_number, bank, metadata)
                .then(function(body){
                    ...
                })
                .catch(function(error){
                    console.log(error);
                });
    e.g : notice that you just supply the bank object from the allBanks array
    PaystackTransfer.createRecipient("Oluwaleke", "Me", "0221859505", allBanks.guaranty_trust_bank, {})
                .then(function (body) {

                })
                .catch(function (error) {
                    console.log(error);
                })


##### Return a list of all recipients
    PaystackTransfer.listRecipients()
                    .then(function(body){
                        ...
                    })
                    .catch(function(error){
                       console.log(error);
                    });


##### Initiate a transfer
    PaystackTransfer.initiateSingle(source, reason, amount, recipient)
                    .then(function(body){
                        ...
                    })
                    .catch(function(error){
                        console.log(error);
                    });

##### Fetch a transfer by its code
    PaystackTransfer.fetchTransfer(code)
                        .then(function(body){
                            ...
                        })
                        .catch(function(error){
                            console.log(error);
                        });


##### List all your transfers
    PaystackTransfer.listTransfers()
                        .then(function(body){
                            ...
                        })
                        .catch(function(error){
                            console.log(error);
                        });

##### Finalize a transfer
    PaystackTransfer.finalize(transfer_code, otp)
                        .then(function(body){
                            ...
                        })
                        .catch(function(error){
                            console.log(error);
                        });


##### Initiate bulk transfer
    PaystackTransfer.initiateBulk(source, transfers)
                        .then(function(body){
                            ...
                        })
                        .catch(function(error){
                            console.log(error);
                        });

##### Check your Paystack account balance
    PaystackTransfer.checkBalance()
                        .then(function(body){
                            ...
                        })
                        .catch(function(error){
                            console.log(error);
                        });

##### Resend OTP for a particular transaction to phone number
    PaystackTransfer.resendOtp(transfer_code)
                        .then(function(body){
                            ...
                        })
                        .catch(function(error){
                            console.log(error);
                        });


##### Disable OTP for future transfers
    PaystackTransfer.disableOtp(otp)
                        .then(function(body){
                            ...
                        })
                        .catch(function(error){
                            console.log(error);
                        });


##### Finalize disabling of OTP
    PaystackTransfer.finalizeOtpDisable()
                        .then(function(body){
                            ...
                        })
                        .catch(function(error){
                            console.log(error);
                        });


##### Enable OTP
    PaystackTransfer.enableOtp()
                        .then(function(body){
                            ...
                        })
                        .catch(function(error){
                            console.log(error);
                        });

# Test
To run tests, add your Paystack test secret key to package.json. (The test line should look something like this: env KEY=sk_test_1as690gfids3ug34fgd0770ds3df88 ./node_modules/.bin/mocha...). Now run:

    npm test
If you want to contribute, also update the corresponding test function and make sure it is working.




