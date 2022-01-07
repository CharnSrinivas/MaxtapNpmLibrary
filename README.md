# Maxtap plugin usage
### JavaScript
```html
      <script data-maxtap-script async src="https://unpkg.com/maxtap_public@0.1.3/dist/maxtap_pubilc.js"></script>
```
```js
             document.querySelector('[data-maxtap-script]').addEventListener('load', () => {
            new Maxtap.Component('spiderman-4').init()
        })
```

### React js (Or) NextJs

```sh
npm install maxtap_public
```

```js
import Maxtap from "maxtap_public";

function App() {
    useEffect(() => {
        const my_ad = new Maxtap.Component('content-id');
        my_ad.init();
    }, [])

    return (
        <div className="App">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quaerat officia quibusdam temporibus consequatur,
                <br />
                quisquam magni quam expedita ipsa laboriosam dicta assumenda officiis eum ducimus sint aspernatur aliquid culpa exercitationem?</p>
            <div>
                <div className="react-player trailer-react-player">
                <video preload="auto" data-displaymaxtap controls src="sample_video.mp4"></video>
                </div>
            </div>
        </div>
    );
}
export default App;
```

### VueJs
```js
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

import * as Maxtap from 'maxtap_plugin/dist';
const maxtap_ad = new Maxtap.Component({contend_id:'spiderman-4'});
window.addEventListener('load',()=>{maxtap_ad.init()})

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>

```
### Use **data-displaymaxtap** in video tag.# Maxtap plugin usage
### JavaScript
```javascript
<!DOCTYPE html>
<html lang="en">
    <head>
        <script data-maxtap-script async src="https://unpkg.com/maxtap_plugin@latest/dist/maxtap_public.js"></script>
        <script>
            document.querySelector('[data-maxtap-script]').addEventListener('load', () => {
                new Maxtap.Component('spiderman-4').init()
            })
        </script>
    </head>
    <body>
        <video preload="auto" data-displaymaxtap controls src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"></video>
    </body>
</head>
```
### React js (Or) NextJs

```sh
npm install maxtap_public
```

```js
import * as  Maxtap from "maxtap_public/dist";

function App() {
    useEffect(() => {
        const my_ad = new Maxtap.Component('content-id');
        my_ad.init();
    }, [])

    return (
        <div className="App">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quaerat officia quibusdam temporibus consequatur,
                <br />
                quisquam magni quam expedita ipsa laboriosam dicta assumenda officiis eum ducimus sint aspernatur aliquid culpa exercitationem?</p>
            <div>
                <div className="react-player trailer-react-player">
                <video preload="auto" data-displaymaxtap controls src="sample_video.mp4"></video>
                </div>
            </div>
        </div>
    );
}
export default App;
```
### Use **data-displaymaxtap** in video tag.