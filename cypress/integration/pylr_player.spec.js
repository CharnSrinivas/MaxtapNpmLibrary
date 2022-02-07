/// <reference types="Cypress" />
// const ad_times = [323, 523, 1105, 1460, 1993, 2508, 3865]
const ad_times = [3, 15, 26]
var video_url =  "https://storage.googleapis.com/maxtap-adserver-dev.appspot.com/sample-mp4-small.mp4";
// "https://storage.googleapis.com/maxtap-adserver-dev.appspot.com/sample-mp4-file.mp4"
var video_blob;


function loadVideo() {
    return new Promise((resolve, rej) => {
        fetch(video_url).then(res => {
            res.blob().then(blob => {
                video_blob = URL.createObjectURL(blob)
                console.log("end");
                resolve(video_blob);
            })
        }).catch(err => { rej(err) })
    })
}

describe('Pylr player testing', () => {

    describe("Site Visit", () => {

        it('Visit', () => {
            cy.visit('/')
        })

        it('Movie click', () => {
            cy.contains("Vinveli").click()
        })

        it('Loading video', () => {

            const load = loadVideo();
            cy.wrap(load, { timeout: 50 * 1000 });
            cy.wait(500)

        })

    })


    for (let i = 0; i < ad_times.length; i++) {

        describe(`${i + 1} Ad test`, () => {

            it("Backward Ad test", () => {
                cy.contains("Watch").click({ force: true })
                cy.get(`[data-displaymaxtap]`);
                cy.document().then((doc) => {
                    cy.wait(300);
                    let back_time = (ad_times[i]) - ((Math.random() * 2) + 1);
                    doc.querySelector('[data-displaymaxtap]').src = video_blob;
                    doc.querySelector('[data-displaymaxtap]').currentTime = back_time;
                    cy.get(".maxtap_main").should("not.exist");
                    cy.get(".maxtap_main").should("not.exist"); cy.contains("Close").click({ force: true });
                })

            })

            it("Forward Ad test", () => {
                cy.contains("Watch").click({ force: true });
                cy.get(`[data-displaymaxtap]`);
                cy.document().then((doc) => {
                    cy.wait(300);
                    let forward_time = ((Math.random() * 4)) + ad_times[i];
                    doc.querySelector('[data-displaymaxtap]').src = video_blob;
                    doc.querySelector('[data-displaymaxtap]').currentTime = forward_time;
                    // cy.get(".maxtap_main").should("exist").click(); //* Clicking ads
                    cy.wait(300);
                    cy.contains("Close").click({ force: true })
                })
            })


            //! Only fire-fox allows full-screen via javascript, Chrome, Opera, Edge e.t.c won't allow
            //! Throws: FullScreen Error

            // it("Full-Screen ", () => {
            //     cy.get(".plyr__video-wrapper").then(($wrapper) => {

            //         $wrapper.click(); // * Click pylr wrapper to make video controls show up
            //         cy.get(`[data-plyr="fullscreen"]`).click().then(($ele) => {
            //             cy.get(".maxtap_component_wrapper").should("be.visible");
            //             cy.wait(1500)
            //             cy.get(".maxtap_main").should("exist");
            //             $wrapper.click()
            //             $ele.click()
            //         })
            //     })
            // })

            // it("Close", () => {
            //     cy.contains("Close").click({ force: true })
            //     cy.wait(400)
            // })

        })
    }
});