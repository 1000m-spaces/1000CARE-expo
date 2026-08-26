import React, { useCallback } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import PressScale from '~/design-system/PressScale';
import { Image } from '~/common/index'
import Header from '~/common/Header/index';
import { back } from '~/assets/constants';
import strings from '~/i18n';
import ItemRecharge from './ItemRecharge';
import Ocean from '~/assets/configNeoMed/bank/Oceanbank_logo.png';
import CB from '~/assets/configNeoMed/bank/CBbank_logo.png';
import Add from '~/assets/configNeoMed/bank/add.png';
import Chevron from '~/assets/configNeoMed/bank/Chevron_Right.png';
const fullWidth = Dimensions.get('window').width;

const data = [
    { image: Ocean, name: "OCB", fullName: "Ngân hàng Đại Dương" }, { image: CB, name: "CB", fullName: "Ngân hàng Xây dựng" },
    { image: Ocean, name: "OCB", fullName: "Ngân hàng Đại Dương" }, { image: CB, name: "CB", fullName: "Ngân hàng Xây dựng" },
    { image: Ocean, name: "OCB", fullName: "Ngân hàng Đại Dương" }, { image: CB, name: "CB", fullName: "Ngân hàng Xây dựng" },
];

const RechargeScreen = props => {

    const renderItem = useCallback((item, index) => <ItemRecharge data={item.item} />);
    const keyExtractor = useCallback((item, index) => index.toString());
    return (
        <View style={styles.container}>
            <Header
                title={strings.RechargeScreen.title}
                leftAction={() => props.navigation.pop()}
                iconLeft={back}
            />
            <View style={styles.viewMoney}>
                <Text style={styles.containerMoney}><Text style={styles.textMoney}>100.000</Text> VND</Text>
                <Text style={styles.textRecharge}>Nạp tiền vào tài khoản Neo</Text>
            </View>
            <View>
                <View style={styles.viewInfo}>
                    <Text style={styles.textInfo}>Dịch vụ</Text>
                    <Text style={styles.textDetail}>Nạp tiền</Text>
                </View>
                <View style={styles.viewInfo}>
                    <Text style={styles.textInfo}>Phí giao dịch</Text>
                    <Text style={styles.textDetail}>Miễn phí</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    style={styles.flatList}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
            </View>
            <View style={styles.viewAddBank}>
                <PressScale style={styles.viewAdd}>
                    <Image style={styles.image} source={Add} />
                </PressScale>
                <Text style={styles.textAdd}>Thêm liên kết</Text>
                <PressScale style={styles.buttonChevron}>
                    <Image style={styles.chevron} source={Chevron} />
                </PressScale>
            </View>
        </View>
    );
}
export default RechargeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewMoney: {
        height: 135,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 20,
        marginBottom: 1
    },
    textMoney: {
        fontSize: 24,
        color: '#595959'
    },
    containerMoney: {
        color: '#8C8C8C'
    },
    textRecharge: {
        color: '#8C8C8C',
        fontSize: 16,
        marginTop: 20
    },
    viewInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white',
        paddingHorizontal: 20
    },
    textInfo: {
        color: '#8C8C8C',
        fontSize: 15
    },
    textDetail: {
        color: '#595959',
        fontSize: 15
    },
    flatList: {
        marginTop: 10,
        flex: 1
    },
    buttonChevron: {
        width: fullWidth * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewAddBank: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 1,
        marginBottom: 5,
    },
    viewAdd: {
        width: fullWidth * 0.3 - 10,
        alignItems: 'center'
    },
    textAdd: {
        width: fullWidth * 0.55,
    }
});