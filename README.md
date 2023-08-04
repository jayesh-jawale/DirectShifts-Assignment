To run spec file:
1. In headed mode - npx cypress open
2. In headless mode - npx cypress run –headless –spec cypress/e2e/assignment.cy.js 

Page to add automation code - https://staging.directshifts.com/jobs/p/physicians-hospital-telehealth-openings-9057

I mostly added seperate 'it' blocks for different scenario's
There are total 7 'it' blocks.
1. First 'it' block will verify header, job title and it's details.
2. Second 'it' block will verify description and it's details.
3. Third 'it' block will verify About DirectShifts and it's contents.
4. Fourth 'it' block will verify footer and it's contents.
5. Fifth 'it' block will fill out the form details. This is Positive case completing all the fields. We are using Faker to generate the data.
6. Sixth 'it' block will verify user is not able to apply using same email again. This is Negative case. We are using Faker to generate the data.
7. Seventh 'it' block will verify user is not able to submit the form unless all required fields are completed. This is again Negative case and we are also verifying the Form Validation message.