import { View, Text } from 'react-native';
import LogoutButton from '../../COMPONENTS/LogoutButton';
import { LoginStyles } from '../../STYLES/styles';
 
export default function Account() {

    return (
        <View style={[LoginStyles.container]}>
            <Text> Pantry Pal </Text>
            <Text> Version 0.3 </Text>
            <View style={[LoginStyles.buttonContainer]}>
                <LogoutButton/>
            </View>
        </View>
    );
}