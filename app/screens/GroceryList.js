import { useState } from "react";
import { View } from 'react-native';
import CheckBox from "../../COMPONENTS/checkBox";
import { containerStyle } from '../../STYLES/styles.js';

export default function GroceryList() {
    // insert logic for generating list items here eventually
    // temporary list for testing
    const [milk, setMilk] = useState(false);
    const [eggs, setEggs] = useState(false);
    const [bread, setBread] = useState(false);
    
    return (
        <View style={containerStyle.container}>
            {/* again, eventually change to function for dynamic updating */}
            <CheckBox
                onPress={ () => setMilk(!milk) }
                title="Milk"
                isChecked={milk}
            />
            <CheckBox
                onPress={ () => setEggs(!eggs) }
                title="Eggs"
                isChecked={eggs}
            />
            <CheckBox
                onPress={ () => setBread(!bread) }
                title="Bread"
                isChecked={bread}
            />
        </View>
    );
}