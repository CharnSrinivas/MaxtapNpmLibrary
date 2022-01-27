/// <reference types="Cypress" />
const ad_times = [323, 523, 1105, 1460, 1993, 2508, 3865]
// const ad_times = [3, 15, 26]
describe("Site Visit", () => {

    it('Visit', () => {
        cy.visit('/')
    })

    it('Movie click', () => {
        cy.contains("Vinveli").click();
    })

})

for (let i = 0; i < ad_times.length; i++) {

    describe(`${i + 1} Ad test`, () => {
        it("Open", () => {
            cy.contains("Watch").click({ force: true })
            cy.wait(400)
        })

        it("Backward Ad test", () => {
            cy.document().then((doc) => {
                cy.wait(300);
                let back_time = (ad_times[i]) - ((Math.random() * 2) + 1);
                doc.querySelector('[data-displaymaxtap]').currentTime = back_time;
                cy.wait(300);
                cy.get(".maxtap_component_wrapper").should("not.be.visible");
                cy.get(".maxtap_main").should("not.exist");

            })
        })

        it("Forward Ad test", () => {

            cy.document().then((doc) => {
                cy.wait(300);
                let forward_time = ((Math.random() * 4)) + ad_times[i];
                doc.querySelector('[data-displaymaxtap]').currentTime = forward_time;
                cy.get(".maxtap_component_wrapper").should("be.visible");
                cy.get(".maxtap_main").should("exist").click();
                cy.wait(300);
                
            })
        })
        it("Full-Screen ", () => {
            cy.get(".plyr__video-wrapper").then(($wrapper) => {

                $wrapper.click(); //Click pylr wrapper to make video controls show up
                cy.get(`[data-plyr="fullscreen"]`).click().then(($ele) => {
                    cy.get(".maxtap_component_wrapper").should("be.visible");
                    cy.wait(1500)
                    cy.get(".maxtap_main").should("exist");
                    $wrapper.click()
                    $ele.click()
                })
            })
        })
        it("Close", () => {
            cy.contains("Close").click({ force: true })
            cy.wait(400)
        })

    })
}
