import React, { useEffect, useRef } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";

const MyMapComponent = ({center, zoom}) => {
    const ref = useRef();
    useEffect(() => {
        new window.google.maps.Map(ref.current, {
            center: center,
            zoom: zoom,
        });
    },[]);

    return <div ref={ref} id="map" style={{display: "flex", width: 800, height: 800}}/>;
}

const GoogleMap = () => {
    return (
        <div className=''>
        <Wrapper apiKey={""}>
            <MyMapComponent center={{
                lat: 19.6195,
                lng: 74.6567
            }}
                zoom={16} />
        </Wrapper>
        </div>
    );
}

export default GoogleMap;