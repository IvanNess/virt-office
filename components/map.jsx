import React from 'react'

import styles from '../styles/Map.module.scss'

import GoogleMapReact from 'google-map-react'
import LocationOnIcon from '@material-ui/icons/LocationOn'
 


function Map() {

    const defaultProps = {
        center: {
          lat: 52.0917192,
          lng: 19.4388219
        },
        zoom: 7
    };

    const AnyReactComponent = ({ text }) => <div className={styles.location}>
        <LocationOnIcon style={{color: '#CD0000'}}/>
    </div>;

    return (
        <div className={styles.map}>
            {/* Important! Always set the container height explicitly */}
            <div style={{ height: '1094px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent
                        lat={52.232855}
                        lng={20.9211117}
                        text="Warszawa"
                    />
                    <AnyReactComponent
                        lat={54.3610063}
                        lng={18.5499451}
                        text="Gdańsk"
                    />
                </GoogleMapReact>
            </div>
        </div>
    )
}

export default Map
