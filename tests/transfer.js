var key = process.env.PAYSTACK_TEST_KEY;
var paystackTransfer = require('../index')(key.toString());
var expect = require('chai').expect;
var allBanks = require('../resources/all-banks');
console.log(key);


describe('Paystack Transfer', function(){

    it("Should create a transfer recipient", function (done) {
        paystackTransfer.createRecipient("Oluwaleke", "Me", "0221859505", allBanks.guaranty_trust_bank, {})
            .then(function (body) {
                expect(body).to.have.property('data');
                expect(body.data).to.have.property('type');
                expect(body.data).to.have.property('name');
                expect(body.data).to.have.property('description');
                expect(body.data).to.have.property('createdAt');
                expect(body.data).to.have.property('updatedAt');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("It should return a list of all recipients", function (done) {
        paystackTransfer.listRecipients()
            .then(function (body) {
                expect(body).to.have.property('data');
                expect(body).to.have.property('message');
                expect(body).to.have.property('meta');
                expect(body).to.have.property('status');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should initiate a transfer", function (done) {
        paystackTransfer.initiateSingle("balance", "Calm down", 200000, 'RCP_1t4o61bbb3sc6q2') //todo replace with gotten one
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should fetch a transfer by its code", function (done) {
        paystackTransfer.fetchTransfer('TRF_65jqzyoqclutyud')
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should list all my transfers", function (done) {
        paystackTransfer.listTransfers()
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                expect(body).to.have.property('data');
                expect(body).to.have.property('meta');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should finalize my transfer", function (done) {

        paystackTransfer.finalize('TRF_65jqzyoqclutyud', '792537')
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should initiate bulk transfer", function (done) {
        paystackTransfer.initiateBulk("balance", [
            {
                "amount": 50000,
                "recipient": "RCP_1t4o61bbb3sc6q2"
            },
            {
                "amount": 70000,
                "recipient": "RCP_1t4o61bbb3sc6q2"
            }
        ]).then(function (body) {
            expect(body).to.have.property('status');
            expect(body).to.have.property('message');
            done();
        })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });


    it("Should check my Paystack account balance", function (done) {

        paystackTransfer.checkBalance()
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should resend OTP for a particular transaction to phone number", function (done) {

        paystackTransfer.resendOtp('TRF_65jqzyoqclutyud')
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });


    it("Should disable OTP for future transfers", function (done) {

        paystackTransfer.disableOtp()
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should finalize disabling of OTP", function (done) {

        paystackTransfer.finalizeOtpDisable('777605')
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });

    it("Should enable OTP", function (done) {

        paystackTransfer.enableOtp()
            .then(function (body) {
                expect(body).to.have.property('status');
                expect(body).to.have.property('message');
                done();
            })
            .catch(function (error) {
                return done(error);
            })
            .done();
    });


});