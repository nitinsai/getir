const request = require('supertest')
const app = require('./app');


describe("Get Records", function(){
    it("should return records for given date range", async function(){
        const req = {
            "startDate" : "2016-10-01",
            "endDate" : "2018-12-02",
            "minCount" : 3420,
            "maxCount" : 3425
        }

        const res = await request(app).post('/').send(req)
        // console.log(res.body);
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('records')

    })
})


describe("Get total count in records", function(){
    it("should return totalCounts for given date range", async function(){
        const req = {
            "startDate" : "2016-10-01",
            "endDate" : "2018-12-02",
            "minCount" : 3420,
            "maxCount" : 3425
        }

        const res = await request(app).post('/').send(req)
        // console.log(res.body);
        expect(res.statusCode).toEqual(200)
        expect(res.body.records[0].totalCount).toEqual(3424)

    })
})

describe("Validate Request Object", function(){
    it("should return failure msg", async function(){
        const req = {
            "startDate" : "2016-10-01",
            "endDate" : "2018-12-02",
            "minCount" : 3400
        }

        const res = await request(app).post('/').send(req)
        // console.log(res.body);
        expect(res.statusCode).toEqual(422)
        expect(res.body.msg).toEqual('failure')
        expect(res.body.code).toEqual(1)

    })
})