import { View, Text, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import ClickableBox from '../../COMPONENTS/clickableBox.js';
import {gridStyle} from '../../STYLES/styles.js';


const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <View style={[gridStyle.grid]}>
                <ClickableBox content="Recipe 1" onClick={handleBoxClick} />
                <ClickableBox content="Recipe 2" onClick={handleBoxClick} />
                <ClickableBox content={require('./chicken.jpeg')} onClick={handleBoxClick} />
        <View style={[gridStyle.grid]}>
            <View>
                {/* Modal popout for each individual recipe */}
                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>X</Text>
                        </Pressable>
                        <Text style={styles.modalText}>Hello World!</Text>
                    </View>
                    </View>
                </Modal>

                <ClickableBox content="Recipe 1" onClick={() => setModalVisible(true)} />
                <ClickableBox content={require('./chicken.jpeg')} onClick={() => setModalVisible(true)} />
                {/* You can add more boxes here, need to figure out how to store images */}
            </View>
        </View>
    );
}

export default Home;