import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 20,
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: Colors.text_gray,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: Colors.red,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: Colors.primary,
        marginBottom: 10,
        minWidth: 200,
    },
    cancelButton: {
        backgroundColor: Colors.gray,
        minWidth: 200,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        color: Colors.text_dark,
        textAlign: 'center',
    },
    qrContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 24,
    },
    infoContainer: {
        width: '100%',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 14,
        color: Colors.text_gray,
        flex: 1,
    },
    infoValue: {
        fontSize: 14,
        color: Colors.text_dark,
        fontWeight: '600',
        flex: 1,
        textAlign: 'right',
    },
    amountText: {
        fontSize: 16,
        color: Colors.primary,
        fontWeight: '600',
    },
    contentText: {
        fontSize: 12,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e3f2fd',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
        width: '100%',
    },
    statusText: {
        marginLeft: 12,
        fontSize: 14,
        color: Colors.primary,
        fontWeight: 'normal',
    },
    instructionContainer: {
        width: '100%',
        backgroundColor: '#fff3cd',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    instructionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text_dark,
        marginBottom: 12,
    },
    instructionText: {
        fontSize: 14,
        color: Colors.text_gray,
        lineHeight: 22,
    },
    cancelButtonBottom: {
        backgroundColor: Colors.gray,
        width: '100%',
    },
})

