import { View, Text } from 'react-native';
import { auth } from '../../firebase';
import LogoutButton from '../../COMPONENTS/LogoutButton';
import { ContainerStyle, TextStyle } from '../../STYLES/Styles';

export default function Account() {

    return (
        <View style={[ContainerStyle.defaultContainer]}>
            
            {/* App Details */}
            <Text style={TextStyle.bold}> Pantry Pal </Text>
            <Text style={TextStyle.bold}> Version 1.0 </Text>
            
            {/* User Details */}
            <Text> {'\n'} Account: {auth.currentUser.email} </Text>
            <View style={[ContainerStyle.buttonContainer]}>
                <LogoutButton/>
            </View>

        </View>
    );
}