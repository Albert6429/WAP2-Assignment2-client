
const login = () => {
  cy.visit("https://mymicrobogvue.herokuapp.com/#/");
  cy.get("button[data-test=loginbtn]").click();
  cy.url().should("include", '/login');
  cy.get("input[data-test=username]").type('GYF');
  cy.get("input[data-test=password]").type('123');
  cy.get("button[type=submit]").click();
  cy.url().should("include", "/");
  cy.get(".vue-title").should("contain", "Welcome GYF");
};

describe('User list', () => {
  beforeEach(() => {
    cy.request("https://microblog-staging-api.herokuapp.com/users/")
      .its("body")
      .then(users => {
        users.forEach(element => {
          cy.request("DELETE", `https://microblog-staging-api.herokuapp.com/deleteUser/${element._id}`);
        });
      });

    const user1 = {
      username: "GYF",
      password: "123",
      email: "994593696@qq.com"
    };
    cy.request("POST", `https://microblog-staging-api.herokuapp.com/reg`, user1);
    const user2 = {
      username: "Jack",
      password: "123",
      email: "123456789@qq.com"
    };
    cy.request("POST", `https://microblog-staging-api.herokuapp.com/reg`, user2);
  });

  it('gets user list page', () => {
    login();
    cy.get(".navbar-nav")
      .eq(0)
      .find(".nav-item")
      .eq(3)
      .click();
    cy.url().should("include", "/userlist");
    cy.get("tbody")
      .find("tr")
      .should("have.length", 2)
  });

  describe('Follow one user', () => {
    it("adds 1 follow", () => {
      login();
      cy.wait(500)
      cy.get(".navbar-nav")
        .eq(0)
        .find(".nav-item")
        .eq(3)
        .click();
      cy.url().should("include", "/userlist");
      cy.wait(500)
      cy.get("tbody")
        .find("tr")
        .eq(0)
        .find("td")
        .eq(3)
        .find("a")
        .click();
      cy.get(':nth-child(2)').contains('1')
    });
  });
});
