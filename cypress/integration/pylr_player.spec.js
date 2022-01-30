/// <reference types="Cypress" />

const ad_data = [{"client_id":"2vget0vgdp","episode_no":0,"gender":"men","caption_regional_language":"பருத்தி சட்டை","season":0,"content_name":"vinveli payana kuripugal","product_details":"white half shirt men","image_link":"https://storage.googleapis.com/publicmaxtap-prod.appspot.com/images/7jyzqgm9qa_1.png","duration":5940,"subcategory":"top wear","redirect_link":"https://bit.ly/3FehEYh","content_type":"movie","content_language":"tamil","content_id":"7jyzqgm9qa","caption":"Cotton Shirt","product_link":"https://www.myntra.com/13379568","show_name":"vinveli payana kuripugal","category":"fashion","article_type":"shirt","end_time":333,"start_time":323,"client_name":"cholalabs_moviewood"},{"episode_no":0,"caption_regional_language":"பாக்கெட்டுடன் ராயல் தோட்டி","caption":"Royal Dhoti with Pocket","start_time":441,"product_details":"cream dhoti with pocket","image_link":"https://storage.googleapis.com/publicmaxtap-prod.appspot.com/images/7jyzqgm9qa_2.png","article_type":"dhoti","duration":5940,"content_type":"movie","client_id":"2vget0vgdp","content_id":"7jyzqgm9qa","product_link":"https://www.myntra.com/2398507","subcategory":"bottom wear","gender":"men","end_time":451,"category":"fashion","content_name":"vinveli payana kuripugal","redirect_link":"https://bit.ly/3f8kZhb","content_language":"tamil","season":0,"show_name":"vinveli payana kuripugal","client_name":"cholalabs_moviewood"},{"image_link":"https://storage.googleapis.com/publicmaxtap-prod.appspot.com/images/7jyzqgm9qa_3.png","content_type":"movie","caption_regional_language":"சிவப்பு சட்டை","content_language":"tamil","season":0,"product_details":"red half shirt","start_time":523,"episode_no":0,"client_name":"cholalabs_moviewood","duration":5940,"content_id":"7jyzqgm9qa","product_link":"https://www.myntra.com/5556437","show_name":"vinveli payana kuripugal","end_time":533,"article_type":"shirt","subcategory":"top wear","client_id":"2vget0vgdp","content_name":"vinveli payana kuripugal","gender":"men","redirect_link":"https://bit.ly/3ncb9iD","caption":"Red Shirt","category":"fashion"},{"content_type":"movie","caption":"Cool Tshirt","content_id":"7jyzqgm9qa","product_link":"https://www.myntra.com/1700944","category":"fashion","client_name":"cholalabs_moviewood","subcategory":"top wear","product_details":"yellow half tshirt","client_id":"2vget0vgdp","content_name":"vinveli payana kuripugal","caption_regional_language":"கூல் டிஷர்ட்","redirect_link":"https://bit.ly/3f5Yl98","content_language":"tamil","season":0,"duration":5940,"show_name":"vinveli payana kuripugal","start_time":1105,"gender":"men","episode_no":0,"image_link":"https://storage.googleapis.com/publicmaxtap-prod.appspot.com/images/7jyzqgm9qa_4.png","end_time":1115,"article_type":"tshirt"},{"category":"fashion","episode_no":0,"content_type":"movie","content_language":"tamil","image_link":"https://storage.googleapis.com/publicmaxtap-prod.appspot.com/images/7jyzqgm9qa_5.png","content_name":"vinveli payana kuripugal","gender":"men","client_id":"2vget0vgdp","redirect_link":"https://bit.ly/3FbeioW","start_time":1460,"article_type":"tshirt","end_time":1470,"caption_regional_language":"பங்கி டிஷர்ட்","season":0,"product_details":"black half tshirt","content_id":"7jyzqgm9qa","client_name":"cholalabs_moviewood","show_name":"vinveli payana kuripugal","caption":"Funky Tshirt","subcategory":"top wear","duration":5940,"product_link":"https://myntra.com/2221349"},{"image_link":"https://storage.googleapis.com/publicmaxtap-prod.appspot.com/images/7jyzqgm9qa_6.png","client_name":"cholalabs_moviewood","duration":5940,"season":0,"caption":"Formal Shirt","client_id":"2vget0vgdp","content_language":"tamil","subcategory":"top wear","caption_regional_language":"முறையான சட்டை","start_time":1993,"content_name":"vinveli payana kuripugal","redirect_link":"https://bit.ly/3n5wLx6","product_link":"https://www.myntra.com/14793808","article_type":"shirt","content_id":"7jyzqgm9qa","episode_no":0,"product_details":"striped formal shirt men","content_type":"movie","category":"fashion","show_name":"vinveli payana kuripugal","gender":"men","end_time":2003},{"gender":"men","episode_no":0,"end_time":2518,"product_details":"superman blue tshirt","client_name":"cholalabs_moviewood","season":0,"caption_regional_language":"சூப்பர்மேன் டிஷர்ட்","redirect_link":"https://bit.ly/3q8szyH","show_name":"vinveli payana kuripugal","content_type":"movie","image_link":"https://storage.googleapis.com/publicmaxtap-prod.appspot.com/images/7jyzqgm9qa_7.png","category":"fashion","subcategory":"top wear","content_name":"vinveli payana kuripugal","content_id":"7jyzqgm9qa","product_link":"https://www.myntra.com/3100345","start_time":2508,"duration":5940,"article_type":"tshirt","content_language":"tamil","caption":"Superman Tshirt","client_id":"2vget0vgdp"},{"content_id":"7jyzqgm9qa","episode_no":0,"duration":5940,"start_time":3865,"category":"fashion","content_language":"tamil","season":0,"content_type":"movie","content_name":"vinveli payana kuripugal","client_id":"2vget0vgdp","subcategory":"top wear","product_link":"https://www.myntra.com/2047727","product_details":"full check shirt","image_link":"https://storage.googleapis.com/publicmaxtap-prod.appspot.com/images/7jyzqgm9qa_8.png","show_name":"vinveli payana kuripugal","redirect_link":"https://bit.ly/3r3QnTl","article_type":"shirt","end_time":3875,"gender":"men","caption_regional_language":"சட்டையை சரிபார்க்கவும்","caption":"Check Shirt","client_name":"cholalabs_moviewood"}];
// const ad_data = [3, 15, 26]
describe("Site Visit", () => {

    it('Visit', () => {
        cy.visit('/')
    })

    it('Movie click', () => {
        cy.contains("Vinveli").click();
    })

})

for (let i = 0; i < ad_data.length; i++) {

    describe(`${i + 1} Ad test`, () => {

        it("Open", () => {
            cy.contains("Watch").click({ force: true })
            cy.wait(400)
        })

        var back_time = (ad_data[i]['start_time']) - ((Math.random() * 2) + 1);
        it(`${back_time}sec before ad`, () => {
            cy.document().then((doc) => {
                cy.wait(300);
                doc.querySelector('[data-displaymaxtap]').currentTime = back_time;
                cy.wait(300);
                cy.get(".maxtap_component_wrapper").should("not.be.visible");
                cy.get(".maxtap_main").should("not.exist");

            })
        })

        var forward_time = ((Math.random() * 4)) + ad_data[i]['start_time'];
        it(`${forward_time}secs after ad start`, () => {

            cy.document().then((doc) => {
                cy.wait(300);
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
