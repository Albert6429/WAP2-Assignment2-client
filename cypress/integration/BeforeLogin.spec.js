describe("Before login", () => {
  beforeEach(() => {
    cy.visit("https://mymicrobogvue.herokuapp.com/#/");
  });

  describe("Home page", () => {
    it("Shows a header", () => {
      cy.get(".vue-title").should("contain", "You need to login!!!");
    });
    it("Shows two buttons", () => {
      cy.get('.btn.btn-primary.btn1').should("contain", "Login");
      cy.get('.btn.btn-primary.btn1').should("contain", "Register");
    });

    describe("Navigation bar", () => {
      it("Shows the required links", () => {
        cy.get(".navbar-nav")
          .eq(0)
          .within(() => {
            cy.get(".nav-item")
              .eq(0)
              .should("contain", "Home");
            cy.get(".nav-item")
              .eq(1)
              .should("contain", "Posts List");
            cy.get(".nav-item")
              .eq(2)
              .should("contain", "Post Your Idea");
            cy.get(".nav-item")
              .eq(3)
              .should("contain", "Users List");
          });
        cy.get(".navbar-nav")
          .eq(1)
          .within(() => {
            cy.get(".nav-item")
              .eq(0)
              .should("contain", "Logout");
          });
      });

      it("Redirects to Login page when links are clicked", () => {
        cy.get("[data-test=postbtn]").click();
        cy.url().should("include", "/login?redirect=%2Fwriteposts");
        cy.get(".navbar-nav")
          .eq(0)
          .find(".nav-item")
          .eq(1)
          .click();
        cy.url().should("include", "/login?redirect=%2Fposts");
        // etc
      });
    });
  });

  /*describe('After Login, Home page', () =>{
    it('Shows a header', () =>{
      cy.get("button[data-test=loginbtn]").click();
      cy.url().should("include", '/login');
      cy.get("input[data-test=username]").type('GYF');
      cy.get("input[data-test=password]").type('123');
      cy.get("button[type=submit]").click();
      cy.url().should("include", "/");
      cy.get(".vue-title").should("contain", "Welcome GYF");
    });

    describe('Navigation bar', () =>{
      it('Redirects when links are clicked', ()=>{


        cy.get("[data-test=postbtn]").click();
        cy.url().should("include", "/writeposts");
        cy.get(".navbar-nav")
          .eq(0)
          .find(".nav-item")
          .eq(1)
          .click();
        cy.url().should("include", "/posts");
      });
    })
  });*/
});
