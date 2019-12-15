const login = () => {
  cy.visit("https://mymicrobogvue.herokuapp.com/");
  cy.get("button[data-test=loginbtn]").click();
  cy.url().should("include", '/login');
  cy.get("input[data-test=username]").type('GYF');
  cy.get("input[data-test=password]").type('123');
  cy.get("button[type=submit]").click();
  cy.url().should("include", "/");
  cy.get(".vue-title").should("contain", "Welcome GYF");
};

describe("WritePost page", () => {
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

    //Post Initialization
    cy.request('https://microblog-staging-api.herokuapp.com/posts')
      .its("body")
      .then(posts => {
        posts.forEach(element => {
          cy.request("DELETE", `https://microblog-staging-api.herokuapp.com/deletePost/${element._id}`);
        });
      });

    const post = {
      title: "PostTest",
      author: "GYF",
      content: "This is a test of posting"
    };
    cy.request("POST", `https://microblog-staging-api.herokuapp.com/writeposts`, post);

  });

  describe('Post', () => {
    describe('with valid attributes', () => {
      it('posts successfully', () => {
        login();
        cy.get(".navbar-nav")
          .eq(0)
          .find(".nav-item")
          .eq(2)
          .click();
        cy.url().should("include", "/writeposts");

        cy.get("input[data-test=title]").type('PostTestSuccessfully');
        cy.get("[data-test=content]").type('The is a test of successfully posting');
        cy.get("button[type=submit]").click();

      });
      after(() => {
        cy.wait(100);
        cy.get("tbody")
          .find("tr")
          .should("have.length", 2);
      });
    });

    describe('with blank attributes', () => {
      it('shows error messages', () => {
        login();
        cy.get(".navbar-nav")
          .eq(0)
          .find(".nav-item")
          .eq(2)
          .click();
        cy.url().should("include", "/writeposts");
        cy.get("button[type=submit]").click();
        cy.get(".error").contains("Title");
        cy.get(".error").contains("Content");
      });
    });

    describe('with a title less than 5 letters', () => {
      it('shows error messages', () => {
        login();
        cy.get(".navbar-nav")
          .eq(0)
          .find(".nav-item")
          .eq(2)
          .click();
        cy.url().should("include", "/writeposts");
        cy.get("input[data-test=title]").type('1');
        cy.get("[data-test=content]").type('The is a test');
        cy.get("button[type=submit]").click();
        cy.get(".error").contains("Title");
      });
    });

    describe('with a title more than 20 letters', () => {
      it('shows error messages', () => {
        login();
        cy.get(".navbar-nav")
          .eq(0)
          .find(".nav-item")
          .eq(2)
          .click();
        cy.url().should("include", "/writeposts");
        cy.get("input[data-test=title]").type('123456789012345678901234567890');
        cy.get("[data-test=content]").type('The is a test');
        cy.get("button[type=submit]").click();
        cy.get(".error").contains("Title");
      });
    });

    describe('with a content less than 5 letters', () => {
      it('shows error messages', () => {
        login();
        cy.get(".navbar-nav")
          .eq(0)
          .find(".nav-item")
          .eq(2)
          .click();
        cy.url().should("include", "/writeposts");
        cy.get("input[data-test=title]").type('Less than 5');
        cy.get("[data-test=content]").type(
          'T'
        );
        cy.get("button[type=submit]").click();
        cy.get(".error").contains("Content");
      });
    });

    describe('with a content more than 100 letters', () => {
      it('shows error messages', () => {
        login();
        cy.get(".navbar-nav")
          .eq(0)
          .find(".nav-item")
          .eq(2)
          .click();
        cy.url().should("include", "/writeposts");
        cy.get("input[data-test=title]").type('More than 100');
        cy.get("[data-test=content]").type(
          'TheisatestTheisatestTheisatestTheisatestTheisatestTheisatestTheisatestTheisatestTheisatestTheisatestTheisatestTheisatest'
        );
        cy.get("button[type=submit]").click();
        cy.get(".error").contains("Content");
      });
    });
  });
});
