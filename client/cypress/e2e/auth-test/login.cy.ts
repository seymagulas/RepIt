describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display error message for invalid credentials", () => {
    cy.intercept("POST", "**/login", {
      statusCode: 401,
      body: { message: "Invalid credentials" },
    }).as("loginRequest");

    cy.get('input[name="email"]').type("invalid@example.com");
    cy.get('input[name="password"]').type("invalid_password");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");
    cy.get(".Toastify", { timeout: 10000 }).should(
      "contain.text",
      "Invalid credentials"
    );
  });

  it("should login successfully and redirect to homepage", () => {
    const mockUser = { name: "John Doe", email: "johndoe@example.com" };

    cy.intercept("POST", "**/login", {
      statusCode: 200,
      body: mockUser,
    }).as("loginRequest");

    cy.intercept("GET", "**/user", {
      statusCode: 200,
      body: mockUser,
    }).as("getUserRequest");

    cy.get('input[name="email"]').type("johndoe@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");
    cy.wait("@getUserRequest");
    cy.location("pathname").should("eq", "/");
  });
});
