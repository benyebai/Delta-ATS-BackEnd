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
                .end((err, response) => {
                    response.should.have.status(200);
                })

        })


    })

})
