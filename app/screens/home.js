import { View, Text } from 'react-native';
import * as React from 'react';
import ClickableBox from '../../COMPONENTS/clickableBox.js';
import {gridStyle} from '../../STYLES/styles.js';

const Home = () => {
    const handleBoxClick = () => {
        // Handle the click action here
        alert('Box clicked!');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={[gridStyle.grid]}>
                <ClickableBox content="Recipe 1" onClick={handleBoxClick} />
                <ClickableBox content="Recipe 2" onClick={handleBoxClick} />
                <ClickableBox content={require('./chicken.jpeg')} onClick={handleBoxClick} />
                {/* You can add more boxes here, need to figure out how to store images */}
            </View>
        </View>
    );
}

export default Home;