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
                <video preload="auto" data-displaymaxtap controls src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"></video>
                </div>
            </div>
        </div>
    );
}

export default App;