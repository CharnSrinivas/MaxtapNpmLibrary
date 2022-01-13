
1 -> git clone <repo>

2 -> cd <proj_dir>

3 -> npm install
    
<<-------   Build project  --------->>

4 -> npm run build

'dist' folder will be generated in root-directory where all your node transpiled and minified node modules will be.

<<---------- Testing project -------->>
     
       1) cd <proj_dir>

       2) Run: sudo ./dev.sh

       3) open another terminal and run 'npm run webpack:w'

       4) Now cd<testing_project> to the desired project you wanna test.

       5) Then run npm link maxtap_plugin_dev : It links your dev project files and folders to test project


       6) import {Component} from 'maxtap_plugin_dev'
              window.addEventLister('load',()=>{
                     new Component({content_id:'content_id'}).init()
              })
       
       7) Now if you update or change your files in proj_dir it reflects in your test project

       ------ Classic web

           cd <proj_dir>
           cd examples/classic_web
           run some server to host index.html 

           ------ Recommended to use parcel 

            1) Run -> npm i -g parcel -> Install parcel to your global node_modules.
            
            2) Run -> parcel src/index.html -> It creates dist folder in your project root dir where all your html,js,css,static files are being served.
    
       ------ ReactJs

           cd <proj_dir>
           cd examples/reactjs
           npm install
           npm start
    
       ------ NextJs
           cd <proj_dir>
           cd examples/nextjs
           npm install 
           npm run dev

       ---- 🧪 Happy Testing 🧪----       

NOTES:
1) npm run webpack --> this command will generate plugin.js file which is plain javascript file used in running vanilla javascript projects
2) npm run build:node -> 



Things to Do:

Steps for packaging and distribution:
1) npm run build -> it will create dist folder with plugin.js file and node modules
2) npm pack -> create a tar ball for our plugin. Now do testing with this zip file.
3) publish it on npmjs
4) using the cdn link from unpkg test the vanilla implementation in tampermonkey etc.

Testing:
1) Test vanila javascript implementation (in examples/classic web)
2) Test in Cholalabs Next js project
3) Test in React boiler plate project
4) Test in Koode tampermonkey