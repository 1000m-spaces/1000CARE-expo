import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Buttons from "../../../common/Buttons/Buttons";

const ItemDelivered = props => {
    const {product} = props;
    return(
        <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',borderBottomWidth:0.3, marginTop:10, paddingBottom:5, alignItems:'center'}}>
            <View style={{marginLeft:10}}>
                <Text>Mã đơn hàng: {product.code}</Text>
                <Text>Ngày đặt hàng: {product.date}</Text>
                <Text>Tổng tiền: <Text style={{color:'red'}}>{product.money}</Text> đ</Text>
                <Text>Tại NPP: {product.company}</Text>
            </View>
            <View style={{marginRight:10,alignItems:'center'}}>
                <Buttons styleText={{fontWeight:'normal'}} styleButton={{paddingHorizontal:10}} text={'Đặt nhanh'} />
            </View>
        </View>
    );
}
export default ItemDelivered;