import React, { useEffect } from 'react';
import {MaxtapComponent} from 'maxtap_plugin_dev';
import './App.css';

function App() {

    useEffect(() => {

        MaxtapComponent.init({content_id:"test_data"});
    }, [])

    return (
        <div className="App">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quaerat officia quibusdam temporibus consequatur,
                <br />
            quisquam magni quam expedita ipsa laboriosam dicta assumenda officiis eum ducimus sint aspernatur aliquid culpa exercitationem?</p>

            <div id='parent'>
                <div >
                <video preload="auto" data-displaymaxtap controls src="https://storage.googleapis.com/maxtap-adserver-dev.appspot.com/sample-mp4-small.mp4"></video>
                </div>
            </div>
        </div>
    );
}

export default App;