import React, { useEffect } from 'react';
import * as Maxtap from './dist/index';
import './App.css';

function App() {
    useEffect(() => {
        new Maxtap.Component('spiderman-4').init()
        
    }, [])
    return (
        <div className="App">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quaerat officia quibusdam temporibus consequatur,
                <br />
                quisquam magni quam expedita ipsa laboriosam dicta assumenda officiis eum ducimus sint aspernatur aliquid culpa exercitationem?</p>

            <div>
                <div className="react-player trailer-react-player">
                <video preload="auto" data-maxtap_ad controls src="sample_video.mp4"></video>
                </div>
            </div>
        </div>
    );
}

export default App;