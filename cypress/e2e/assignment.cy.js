import constants from "../constants/constants.json";
import { faker } from "@faker-js/faker";

import { ApplyHere } from "../pages/ApplyHereForm";
const ApplyHereForm = new ApplyHere();

describe("Validating test scenarios for DirectShifts assignment", () => {
  beforeEach(() => {
    cy.visit(
      "https://staging.directshifts.com/jobs/p/physicians-hospital-telehealth-openings-9057"
    );
  });

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const phoneNumber = faker.random.numeric(10, {
    allowLeadingZeros: false,
  });
  const shippingZip = faker.string.numeric(5);

  it("Verify header, job title and it's details", () => {
    // Verify header
    cy.get(".logo-img").should("have.attr", "alt", constants.directShifts);

    // Verify job title
    cy.get(".job_title").contains(constants.jobTitle);

    // Verify job location
    cy.get(".job_location").contains(constants.job_location);

    // Verify job specialities
    cy.get(".specialties").contains(constants.specialties.anesthesiology);
    cy.get(".specialties").contains(constants.specialties.dermatology);
    cy.get(".specialties").contains(constants.specialties.emergencyMedicine);
    cy.get(".specialties").contains(constants.specialties.familyMedicine);
    cy.get(".specialties").contains(constants.specialties.internalMedicine);
    cy.get(".specialties").contains(constants.specialties.gastroenterology);
    cy.get(".specialties").contains(constants.specialties.psychiatry);
    cy.get(".specialties").contains(constants.specialties.neurology);

    // Verify job details
    cy.get(".job_hidden_details").contains(constants.jobDetails.employer);
    cy.get(".job_hidden_details").contains(constants.jobDetails.category);
    cy.get(".job_hidden_details").contains(constants.jobDetails.shiftType);
    cy.get(".job_hidden_details").contains(constants.jobDetails.salaryWeek);
    cy.get(".job_hidden_details").contains(
      constants.jobDetails.visaSponsorship
    );

    // Verify Sign In text link
    cy.get(".sign_in_text")
      .find("a")
      .should(
        "have.attr",
        "href",
        "/jobs/physicians-hospital-telehealth-openings-9057/view"
      )
      .should("have.text", constants.signIn);

    cy.get(".sign_in_text").contains(constants.signInText);
    cy.get(".share_text").should("exist");
  });

  it("Verify description and it's details", () => {
    // Verify description
    cy.get(".description p")
      .eq(0)
      .contains(constants.description.descriptionTextOne);
    cy.get(".description p")
      .eq(1)
      .contains(constants.description.descriptionTextTwo);
    cy.get(".description p")
      .eq(2)
      .contains(constants.description.descriptionTextThree);
    cy.get(".description p")
      .eq(3)
      .contains(constants.description.descriptionTextFour);
    cy.get(".description p")
      .eq(4)
      .contains(constants.description.descriptionTextFive);

    // Verify Requirements
    cy.get(".description p")
      .eq(5)
      .contains(constants.requirements.requirementsText);
    cy.get("ul li").eq(0).contains(constants.requirements.firstRequirement);
    cy.get("ul li").eq(1).contains(constants.requirements.secondRequirement);
    cy.get("ul li").eq(2).contains(constants.requirements.thirdRequirement);

    // Apply to learn more
    cy.get(".description p").eq(6).contains(constants.applyToLearnMore);
  });

  it("Verify About DirectShifts and it's contents", () => {
    // Verify About DirectShifts title
    cy.get(".about-title").contains(constants.aboutDirectShiftsTitle);

    // Verify about DirectShifts text
    cy.get(".about-text").contains(constants.aboutDirectShiftsText);

    // Verify about DirectShifts advantages
    cy.get(".about-advantage")
      .eq(0)
      .contains(constants.aboutDirectShiftAdvantages.advantageOne);
    cy.get(".about-advantage")
      .eq(1)
      .contains(constants.aboutDirectShiftAdvantages.advantageTwo);
    cy.get(".about-advantage")
      .eq(2)
      .contains(constants.aboutDirectShiftAdvantages.advantageThree);
  });

  it("Verify footer and it's contents", () => {
    // Verify footer
    cy.get(".footer-logo img").should(
      "have.attr",
      "alt",
      constants.directShifts
    );
    cy.get(".copyright").contains(constants.copyright);
    cy.get(".footer-font").eq(0).contains(constants.footerEmail);
    cy.get(".footer-font").eq(1).contains(constants.footerPhoneNumber);
  });

  it("Apply Here - Fill the form details (Positive case)", () => {
    // Apply here form - Positive case
    ApplyHereForm.fillApplyHereFrom(
      firstName,
      lastName,
      email,
      phoneNumber,
      shippingZip
    );
  });

  it("Apply Here - Verify user is not able to apply using same email again (Negative case)", () => {
    // Apply here form - Negative case
    ApplyHereForm.fillApplyHereFrom(
      firstName,
      lastName,
      email,
      phoneNumber,
      shippingZip
    );
  });

  it("Apply Here - Verify user is not able to submit the form unless all required fields are completed (Negative case)", () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const phoneNumber = faker.random.numeric(10, {
      allowLeadingZeros: false,
    });
    const shippingZip = faker.string.numeric(5);

    // Apply here form - Negative case
    ApplyHereForm.fillApplyHereFromCheckingValidationMessage(
      firstName,
      lastName,
      email,
      phoneNumber,
      shippingZip
    );
  });
});
