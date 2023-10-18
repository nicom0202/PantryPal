import { View, Text, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import ClickableBox from '../../COMPONENTS/clickableBox.js';
import {gridStyle, viewStyle, buttonStyle, textStyle} from '../../STYLES/styles.js';


const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);

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
            </View>
            <View style={[gridStyle.grid]}>
                <View>
                    {/* Modal popout for each individual recipe */}
                    <Modal 
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}>
                        <View style={viewStyle.centeredView}>
                        <View style={viewStyle.modalView}>
                            <Pressable
                                style={[buttonStyle.open, buttonStyle.close]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={textStyle.body}>X</Text>
                            </Pressable>
                            <Text style={textStyle.modalText}>Hello World!</Text>
                        </View>
                        </View>
                    </Modal>

                    <ClickableBox content="Recipe 1" onClick={() => setModalVisible(true)} />
                    <ClickableBox content={require('./chicken.jpeg')} onClick={() => setModalVisible(true)} />
                    {/* You can add more boxes here, need to figure out how to store images */}
                </View>
            </View>
        </View>
    );
}

export default Home;