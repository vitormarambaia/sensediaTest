const request = require("supertest");

const keyApi = "bb0afd0f2da95c44fcc727b34d640d9a";
const tokenApi = "3b5433627f73e9fff7f244f079f263dc147f6457463334ccefac3844ec6d9e08";
const idList = "55ba3876762755e715f07921"
const auth = "?key="+keyApi+"&token="+tokenApi;
const apiUrl = "https://api.trello.com/";
let cardId;


describe("GET 1/members/me", () => {
    it("should return 200 and check property 'id' exist", async () => {
        const response = await request(apiUrl)
        .get("1/members/me/"+auth)
        .expect(200)
        .then(response => {
            expect(response.body).toHaveProperty("id");
        })
    });
    it("should return 401 with 'invalid key'", async () => {
        const response = await request(apiUrl)
        .get("1/members/me/")
        .expect(401)
        .then(response => {
            expect(response.text).toEqual("invalid key");
        })
    });
});

describe("POST 1/cards", () => {
    it("should return 200 and check name 'NewCard'", async () => {
        const response = await request(apiUrl)
        .post("1/cards"+auth+"&idList="+idList)
        .send({ name:"NewCard"})
        .expect(200)
        .then(response => {
            expect(response.body.name).toEqual("NewCard")
            const { id } = response.body
            cardId = id
        })
    });

    it("should return 400 because isn't value for 'idList'", async () => {
        const response = await request(apiUrl)
        .post("1/cards"+auth)
        .send({ name:"NewCard2"})
        .expect(400)
        .then(response => {
            expect(response.text).toEqual("invalid value for idList");
        })
    });
    
});

describe("PUT 1/cards/", () => {
    it("should return 200 and check name 'EditCard'", async () => {
        const response = await request(apiUrl)
        .put("1/cards/"+cardId+auth)
        .send({ name:"EditCard"})
        .expect(200)
        .then(response => {
            expect(response.body.name).toEqual("EditCard")
        })
    });

    it("should return 404 and check name 'EditCard'", async () => {
        const response = await request(apiUrl)
        .put("1/cards/"+auth)
        .send({ name:"EditCard"})
        .expect(404)
        .then(response => {
            expect(response.text).not.toHaveProperty("body");
        })
    });
})

describe("DELETE 1/cards/", () => {
    it("should return 200 and delete card", async () => {
        const response = await request(apiUrl)
        .delete("1/cards/"+cardId+auth)
        .expect(200)
        .then(() => {
             return request(apiUrl)
            .del("1/cards/"+cardId+auth)
            .expect(404)
        });
    })
})
  
//     it("should return 404 with 'The user was not found'", () => {
//       return request(apiBoard)
//         .get("/users/121212")
//         .expect(404)
//         .then(response => {
//           expect(response.body).toEqual("The user was not found");
//         });
//     }); 
//   });
  
//   describe("POST /users", () => {
//     it("should return 200 and check user with name 'TestAPI' exist", () => {
//       return request(apiBoard)
//         .post("/users")
//         .send({ name:"TestAPI", jobTitle:"Test Engineer" })
//         .expect(200)
//         .then(() => {
//           return request(apiBoard)
//           .get("/users")
//           .query({ name:"TestAPI" })
//           .expect(200)
//         });
//     });
  
//     it("should return 400 because user name already exists", () => {
//       return request(apiBoard)
//         .post("/users")
//         .send({ name:"TestAPI", jobTitle:"Test Engineer" })
//         .expect(400)
//         .then(response => {
//           expect(response.body).toEqual("The user name already exists");
//         });
//     }); 
//   });
  
//   describe("PUT /users/{id}", () => {
//     it("should return 200 and check user was update to 'TestAPI'", () => {
//       return request(apiBoard)
//         .put("/users/123456")
//         .send({ name:"TestAPIEdited", jobTitle:"Test Engineer" })
//         .expect(200)
//         .then(() => {
//           return request(apiBoard)
//           .get("/users")
//           .query({ name:"TestAPIEdited" })
//           .expect(200)
//         });
//     });
//   });
  
//   describe("Delete /users/{id}", () => {
//     it("should return 200 and check user was not found", () => {
//       return request(apiBoard)
//         .del("/users/123456")
//         .expect(200)
//         .then(() => {
//           return request(apiBoard)
//           .del("/users/123456")
//           .expect(404)
//         });
//     });
//   });