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

describe('Log out', () => {
  it('logs out successfully', () => {
    //User Initialization
    cy.request("https://microblog-staging-api.herokuapp.com/users/")
      .its("body")
      .then(users => {
        users.forEach(element => {
          cy.request("DELETE", `https://microblog-prod-api.herokuapp.com/deleteUser/${element._id}`);
        });
      });
    const user = {
      username: "GYF",
      password: "123",
      email: "994593696@qq.com"
    };
    cy.request("POST", `https://microblog-staging-api.herokuapp.com/reg`, user);

    login();

    cy.get(".navbar-nav")
      .eq(1)
      .find(".nav-item")
      .eq(0)
      .click();
    cy.get("button")
      .contains("OK")
      .click();
    cy.get("button")
      .contains("OK")
      .click();
    cy.url().should("include", "/login");
  });
});
