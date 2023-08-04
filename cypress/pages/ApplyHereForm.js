import constants from "../constants/constants.json";

class ApplyHere {
  fillApplyHereFrom(firstName, lastName, email, phoneNumber, shippingZip) {
    cy.get("#user_first_name").type(firstName);
    cy.get("#user_last_name").type(lastName);
    cy.get("#user_email").type(email);
    cy.get("#user_phone").type(phoneNumber);
    cy.get("#user_password").type(constants.newPassword);
    cy.get("#user_zipcode").type(shippingZip);
    cy.get(".upload").selectFile("cypress/fixtures/apiTesting.pdf");
    cy.clickFromDropdown("select#user_state", "AA", "AA");
    cy.clickFromDropdown("select#user_occupation", "pharmacist", "pharmacist");
    cy.get(".terms_text").contains(constants.termsTextMessage);

    // Handle captcha iframe
    cy.get("iframe").then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body).find("#recaptcha-anchor").click({ force: true });
    });
    cy.wait(3000);
    cy.get("#user_form_submit").click({ force: true });
    cy.wait(6000);
    let bodyText;
    cy.get("body").then(($body) => {
      bodyText = $body.text();
      if (bodyText.includes(constants.successfullApplicationText)) {
        cy.get(".body div").contains(constants.successfullApplicationText);
      } else {
        cy.log("Already Applied");
      }
    });
  }

  fillApplyHereFromCheckingValidationMessage(
    firstName,
    lastName,
    email,
    phoneNumber,
    shippingZip
  ) {
    cy.get("#quick_application_form").within(() => {
      // Click submit without completing First Name field.
      cy.get("#user_form_submit").click();
      cy.get("#user_first_name")
        .invoke("prop", "validationMessage")
        .should("equal", "Please fill in this field.");
      cy.get("#user_first_name").type(firstName);

      // Click submit without completing Last Name field.
      cy.get("#user_form_submit").click();
      cy.get("#user_last_name")
        .invoke("prop", "validationMessage")
        .should("equal", "Please fill in this field.");
      cy.get("#user_last_name").type(lastName);

      // Click submit without completing Email field.
      cy.get("#user_form_submit").click();
      cy.get("#user_email")
        .invoke("prop", "validationMessage")
        .should("equal", "Please fill in this field.");
      cy.get("#user_email").type(email);
    });

    let submitted;
    cy.get("#quick_application_form").invoke("submit", (e) => {
      // do not actually submit the form
      e.preventDefault();
      submitted = true;
    });

    // Add another test to make sure the form is submitted when there are no validation errors.
    cy.get("#quick_application_form")
      .within(() => {
        cy.get("#user_first_name").clear().type(firstName);
        cy.get("#user_last_name").clear().type(lastName);
        cy.get("#user_email").clear().type(email);
        cy.get("#user_phone").type(phoneNumber);
        cy.get("#user_zipcode").type(shippingZip);

        // Handle captcha iframe
        cy.get("iframe").then(($iframe) => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body).find("#recaptcha-anchor").click({ force: true });
        });
        cy.wait(3000);
        cy.get("#user_form_submit").click();
      })
      .then(() => {
        expect(submitted, "form submitted").to.be.true;
      });
  }
}

export { ApplyHere };
