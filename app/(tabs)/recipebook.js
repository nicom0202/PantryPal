import { View, Text, StyleSheet } from "react-native";

/* Colors:
 * Taupe: #54494B
 * Beige: #E2D0BE
 * Dark Green: #082D0F
 * Bright Green: #68A357
 * Faded Green: #6F8F72
 */

const recipe = () => {
	const styles = StyleSheet.create({
		container: {
			backgroundColor: '#E2D0BE',		// beige
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},

		heading: {
			color: '#6F8F72',				// faded green
			backgroundColor: '#082D0F',		// dark green
			fontSize: 24,
		},

		text: {
			color: '#54494B',				// taupe
			fontSize: 18,
		},

		box: {
			borderColor: '#68A357',				// bright green
			borderWidth: 5,
			borderRadius: 5,
			backgroundColor: '#E2D0BE',			// beige
			color: '#54494B',					// taupe
		}
	});

  	return (
    	<View style={{ styles }}>
      	    <Text>My Recipes</Text>
    	</View>
  	);
}
export default recipe;