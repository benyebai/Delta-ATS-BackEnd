let chai = require("chai");
const chaiHttp = require("chai-http");
let server = require("../src/index")

chai.should();

chai.use(chaiHttp);

describe('api',() => {

    describe("POST /modify", () => {
        it("it should return if its modified", (done) => {
            chai.request(server)
                .post("/modify")
                .send({
                    profile_id: "1",
                    contact_id: "1",
                    email: "throwtehcheasdasdsd@gmail.com",
                    password: "password123",
                    firstName: "Thomas",
                    lastName: "Zheng",
                    pronouns: "Him",
                    phoneNum: "17787915430",
                    country: "Canada",
                    province: "British Columbia",
                    city: "Surrey",
                    postalCode: "V4N0Z3",
                    address: "56-16233 83 ave more stuff more stuff",

                  })
                .end((err, response) => {
                    response.should.have.status(200);
                })

        })


    })

})
