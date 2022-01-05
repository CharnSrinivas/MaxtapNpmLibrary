# Maxtap plugin usage
### JavaScript
```javascript
      <script data-maxtap-script async src="https://unpkg.com/maxtap_public@0.1.3/dist/maxtap_public.js"></script>
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
### Use **data-displaymaxtap** in video tag.