describe("Login page", () => {
  beforeEach(() => {
    //User Initialization
    cy.request("https://microblog-staging-api.herokuapp.com/users/")
      .its("body")
      .then(users => {
        users.forEach(element => {
          cy.request("DELETE", `https://microblog-staging-api.herokuapp.com/deleteUser/${element._id}`);
        });
      });

    const user = {
      username: "GYF",
      password: "123",
      email: "994593696@qq.com"
    };
    cy.request("POST", `https://microblog-staging-api.herokuapp.com/reg`, user);

    cy.visit("https://mymicrobogvue.herokuapp.com/#/");
    cy.get("button[data-test=loginbtn]").click();
    cy.url().should("include", '/login');
  });

  describe('Login', () => {
    describe('with valid attributes', () => {
      it('logs in successfully', () => {
        cy.get("input[data-test=username]").type('GYF');
        cy.get("input[data-test=password]").type('123');
        cy.get("button[type=submit]").click();
      });
      after(() => {
        cy.wait(100);
        cy.url().should("include", "/");
        cy.get(".vue-title").should("contain", "Welcome GYF");
      });
    });

    describe('with blank attributes', () => {
      it('shows error messages', () => {
        cy.get("button[type=submit]").click();
        cy.get(".error").contains("Username");
        cy.get(".error").contains("Password");
      });
    });

    describe('with a non-existing username', () => {
      it('shows a Not Exist message', () => {
        cy.get("input[data-test=username]").type('GYFFF');
        cy.get("input[data-test=password]").type('123');
        cy.get("button[type=submit]").click();
        cy.get(".error").contains("The username does not exist");
      });
    });

    describe('with a wrong password', () => {
      it('shows a Wrong Password message', () => {
        cy.get("input[data-test=username]").type('GYF');
        cy.get("input[data-test=password]").type('1234567');
        cy.get("button[type=submit]").click();
        cy.get(".error").contains("The password is wrong");
      });
    });
  });
});
