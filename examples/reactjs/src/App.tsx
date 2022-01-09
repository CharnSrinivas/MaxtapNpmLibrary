import React, { useEffect } from 'react';
import * as Maxtap from 'maxtap_plugin';
import './App.css';

function App() {

    useEffect(() => {
        new Maxtap.Component({content_id:"spiderman-4"}).init();
         
    }, [])

    return (
        <div className="App">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quaerat officia quibusdam temporibus consequatur,
                <br />
                quisquam magni quam expedita ipsa laboriosam dicta assumenda officiis eum ducimus sint aspernatur aliquid culpa exercitationem?</p>

            <div id='parent'>
                <div >
                <video preload="auto" data-displaymaxtap controls src="sample_video.mp4"></video>
                </div>
            </div>
        </div>
    );
}

export default App;