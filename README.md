
# Maxtap plugin usage
### Plain classic web
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <script data-maxtap-script async src="https://unpkg.com/maxtap_plugin@latest/dist/maxtap.min.js"></script>
        <script>
            document.querySelector('[data-maxtap-script]').addEventListener('load', () => {
                new Maxtap.Component({ content_id: 'test_data' }).init();
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
npm install maxtap_plugin
```

```js
import * as Maxtap from "maxtap_plugin";

function App() {
    useEffect(() => {
        const my_ad = new Maxtap.Component({content_id:"test_data"});
        my_ad.init();
    }, [])

    return (
        <div className="App">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quaerat officia quibusdam temporibus consequatur,
                <br />
                quisquam magni quam expedita ipsa laboriosam dicta assumenda officiis eum ducimus sint aspernatur aliquid culpa exercitationem?</p>
            <div>
                <div className="react-player trailer-react-player">
                <video preload="auto" data-displaymaxtap controls src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"></video>
                </div>
            </div>
        </div>
    );
}
export default App;

```
### Use **data-displaymaxtap** in video tag.
