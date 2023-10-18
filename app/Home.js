import { View, Text } from 'react-native';
import React from 'react';
import ClickableBox from '../COMPONENTS/clickableBox';

const Home = () => {
    const handleBoxClick = () => {
        // Handle the click action here
        alert('Box clicked!');
      };

    return (
        <View style={{ flex: 1 }}>
            <View 
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginBottom: 100,
                }}
            >
                <ClickableBox content="Recipe 1" onClick={handleBoxClick} />
                <ClickableBox content="Recipe 2" onClick={handleBoxClick} />
                <ClickableBox content={require('./chicken.jpeg')} onClick={handleBoxClick} />
                {/* You can add more boxes here, need to figure out how to store images */}
            </View>
        </View>
    )
}

export default Home;