import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Image } from '~/common/index'
import TitleBar from '../../common/TitleBar/TitleBar';
import dimension from '../../constants/dimens';
import { StarAction, Star } from '../../assets/constants';
import PressScale from '~/design-system/PressScale';
const data = [
    {name:'Combo Tràng Vị Khang',money1:'199.999',money2:'2.199.999'},{name:'Combo Tràng Vị Khang',money1:'199.999',money2:'2.199.999'},
    {name:'Combo Tràng Vị Khang',money1:'199.999',money2:'2.199.999'},{name:'Combo Tràng Vị Khang',money1:'199.999',money2:'2.199.999'},
    {name:'Combo Tràng Vị Khang',money1:'199.999',money2:'2.199.999'},{name:'Combo Tràng Vị Khang',money1:'199.999',money2:'2.199.999'},
    {name:'Combo Tràng Vị Khang',money1:'199.999',money2:'2.199.999'},{name:'Combo Tràng Vị Khang',money1:'199.999',money2:'2.199.999'},
    {name:'Combo Tràng Vị Khang',money1:'199.999',money2:'2.199.999'},{name:'Combo Tràng Vị Khang',money1:'199.999',money2:'2.199.999'},
    {name:'Combo Tràng Vị Khang',money1:'199.999',money2:'2.199.999'},{name:'Combo Tràng Vị Khang',money1:'199.999',money2:'2.199.999'},
];
const dataStar = [
    {Star:Star, StarAction:StarAction},{Star:Star, StarAction:StarAction},{Star:Star, StarAction:StarAction},
    {Star:Star, StarAction:StarAction},{Star:Star, StarAction:StarAction},
];

const InformationOrder = props => {
    const [countStar,setCountStar] = useState(0);
    const renderPro = data.map((item,index) => {
        return(
            <View style={{flexDirection:'row',padding:10,justifyContent:'space-between',backgroundColor:'white'}}>
                <Text numberOfLines={1} style={{width:dimension.common.WINDOW_WIDTH*0.35,fontSize:12}}>{item.name}</Text>
                <Text style={{fontWeight:'600'}}>{item.money1}<Text style={{fontWeight:"normal",fontSize:12}}> đ x9</Text></Text>
                <Text style={{fontWeight:'600'}}>{item.money2}</Text>
            </View>
        );
    });
    const renderStar = dataStar.map((item,index) => {
        return(
            <PressScale onPress={() => setCountStar(index+1)} >
                {index < countStar
                    ?<Image resizeMode={'contain'} style={{height:25,width:25}} source={item.StarAction} />
                    :<Image resizeMode={'contain'} style={{height:25,width:25}} source={item.Star} />
                }
            </PressScale>
        );
    })
    return(
        <View style={{flex:1,backgroundColor:'#EAEBF0'}}>
            <TitleBar title={'Thông tin đơn hàng'} isShowBtn={true} />
            <View style={{backgroundColor:'white',padding:10, marginBottom:15}}>
                <Text style={{fontSize:16,fontWeight:'600'}}>Danh sách sản phẩm</Text>
            </View>
            <View style={{height:dimension.common.WINDOW_HEIGHT*0.26}}>
                <ScrollView>
                    {renderPro}
                </ScrollView>
            </View>
            <View style={{backgroundColor:'white',padding:10,marginTop:15}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#EAEBF0',paddingBottom:10}}>
                    <Text style={{color:'#040404'}}>Tạm tính</Text>
                    <Text>100.000.000 đ</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#EAEBF0',paddingBottom:10,paddingTop:10}}>
                    <Text>Phí vận chuyển</Text>
                    <Text>0 đ</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>Thành tiền</Text>
                    <View style={{alignItems:'flex-end'}}>
                        <Text style={{color:'red'}}>100.000.000 đ</Text>
                        <Text style={{color:'#0B7B8A'}}>100.000.000 p</Text>
                        <Text>Đã bao gồm VAT nếu có</Text>
                    </View>
                </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:10,padding:10,flex:1}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>Đánh giá</Text>
                    <View style={{flexDirection:'row'}}>
                        {renderStar}
                    </View>
                </View>
                <PressScale style={{backgroundColor:'#F0F0F0',height:60,padding:5,elevation:2,marginTop:10}}>
                    <Text>Chia sẻ những điều bạn thích về sản phẩm này nhé</Text>
                </PressScale>
                <View style={{justifyContent:'center',alignItems:'center',marginHorizontal:20,marginTop:10}}>
                    <PressScale style={{backgroundColor:'#0B7B8A',width:'100%',padding:10,alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:16}}>Đặt lại</Text>
                    </PressScale>
                </View>
            </View>
        </View>
    );
}
export default InformationOrder;