
describe("Register page", () => {
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
    cy.get("button[data-test=registerbtn]").click();
    cy.url().should("include", '/register');
  });

  describe('Register', () => {
    describe('with valid attributes', () => {
      it('registers successfully', () => {
        cy.get("input[data-test=username]").type('Jack');
        cy.get("input[data-test=password]").type('123');
        cy.get("input[data-test=email]").type('994593696@qq.com');
        cy.get("button[type=submit]").click();
      });
      after(() => {
        cy.wait(100);
        cy.url().should("include", "/");
      });
    });

    describe('with blank attributes', () => {
      it('shows error messages', () => {
        cy.get("button[type=submit]").click();
        cy.get(".error").contains("Username");
        cy.get(".error").contains("Password");
        cy.get(".error").contains("Email");
      });
    });

    describe('with a existing username', () => {
      it('shows a Existing message', () => {
        cy.get("input[data-test=username]").type('GYF');
        cy.get("input[data-test=password]").type('123');
        cy.get("input[data-test=email]").type('994593696@qq.com');
        cy.get("button[type=submit]").click();
        cy.get(".error").contains("The username already existed");
      });
    });

    describe('with an invalid email address', () => {
      it('shows a Wrong Password message', () => {
        cy.get("input[data-test=username]").type('David');
        cy.get("input[data-test=password]").type('123');
        cy.get("input[data-test=email]").type('994');
        cy.get("button[type=submit]").click();
        cy.get(".error").contains("Please enter a correct email address");
      });
    });
  });
});
