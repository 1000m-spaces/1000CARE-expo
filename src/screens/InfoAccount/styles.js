import { Dimensions, StyleSheet } from "react-native";
const fullHeight = Dimensions.get('window').height;
const fullWith = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containerBank: {
        backgroundColor: 'white',
        height: fullHeight*0.3,
        padding: 20
    },
    bank: {
        backgroundColor: '#029E9D',
        height: fullHeight*0.3 - 40,
        borderRadius: 12,
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        paddingBottom: 10
    },
    styleTextInput: {
        width: fullWith*0.5
    },
    styleView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 35
    },
    styleButton: {
        borderRadius: 50,
        backgroundColor: '#029E9D',
        width: fullWith - 40,
    },
    containerInput: {
        backgroundColor: 'white',
        marginTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 10,
        flex: 1
    },
    imageBank: {
        justifyContent: 'flex-end',
        marginLeft: 10
    },
    textNumberBank: {
        color: 'white',
        fontSize: 16,
        marginBottom: 20
    },
    viewName: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textName: {
        color: 'white',
        fontSize: 15
    },
    textDate: {
        color: 'white'
    },
    viewCircle: {
        height: 8,
        width: 8,
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 20,
    },
    viewCircle2: {
        height: 8,
        width: 8,
        backgroundColor: 'white',
        borderRadius: 20,
        marginRight: 3
    },
    viewDate: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerCircle: {
        flexDirection: 'row',
        marginLeft: -10
    }
    
});
export default styles;