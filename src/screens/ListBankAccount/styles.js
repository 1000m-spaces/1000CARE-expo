import { Dimensions, StyleSheet } from "react-native";
import { brandColors } from '~/design-system/tokens';
const fullWith = Dimensions.get('window').width;

const styles = StyleSheet.create({
    imageTitle: {
        width: fullWith,
        minHeight: 50
    },
    imageInfo: {
        width: fullWith,
        height: 50,
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.9
    },
    viewTitle: {
        flexDirection: 'row',
        padding: 10
    },
    viewNeo: {
        width: fullWith-60,
        alignItems: 'center'
    },
    styleTitle: {
        color: 'white',
        fontSize: 22
    },
    numberMoney: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
        fontWeight: '600',
        marginTop: 20
    },
    textMoney: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 15
    },
    viewSelect: {
        height: 90,
        elevation: 5,
        marginHorizontal: 20,
        width: fullWith-40,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    buttonSelect: {
        height: 40,
        width: 40,
        backgroundColor: '#E5F9FD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 65
    },
    textHistory: {
        fontSize: 16,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor:'white',
        marginBottom: 1
    },
    textSelect: {
        marginTop: 5
    },
    viewSpace: {
        backgroundColor: '#E5E5E5',
        height: 50
    },
    viewStatement: {
        height: 85,
        width: fullWith,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    buttonStatement: {
        width: fullWith-70,
        backgroundColor: brandColors.tealPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 10
    },
    textStatement: {
        color: 'white',
        fontSize: 16
    }

});
export default styles;