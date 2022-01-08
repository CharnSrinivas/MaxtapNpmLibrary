
# Maxtap plugin usage
### JavaScript
```html
      <script data-maxtap-script async src="https://unpkg.com/maxtap_plugin@0.1.3/dist/maxtap_pubilc.js"></script>
```
```js
             document.querySelector('[data-maxtap-script]').addEventListener('load', () => {
            new Maxtap.Component({content_id:'content-id'}).init()
        })
```

### React js (Or) NextJs

```sh
npm install maxtap_plugin
```

```js
import Maxtap from "maxtap_plugin";

function App() {
    useEffect(() => {
        const my_ad = new Maxtap.Component({content_id:'content-id'});
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

```sh
npm install maxtap_plugin
```

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
### Use **data-displaymaxtap** in video tag.