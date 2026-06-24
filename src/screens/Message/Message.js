import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from '~/common/index'
import styles from "./styles";
// import { MessageAdmin } from "./MessageAdmin";
// import { MessageUser } from "./MessageUser";
import strings from '~/i18n'
import { space } from "../../assets/constants";

export const Message = props => {
    const tabActive = props.tabActive;

    // let tabActive = this.state.tabActive;
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const openModal = useCallback(isOpen => {
        setOpenDetailModal(isOpen);
    });
    return (
        <View style={styles.container}>
            {/* Choose admin - user */}
            <View style={styles.user_or_admin}>
                <TouchableOpacity
                    activeOpacity={tabActive == "admin" ? 1 : 0.75}
                    style={[styles.button, tabActive == "admin" ? styles.touchableAdmin : {}]}
                    onPress={() => props.onTabChange("admin")}
                >
                    <Text
                        style={[
                            styles.label,
                            tabActive == "admin" ? styles.txtTouchableAdmin : styles.txtTouchableUser,
                        ]}
                    >
                        {strings.strings.tab_admin}
                    </Text>
                </TouchableOpacity>
                <Image source={space} style={styles.img_space} />
                <TouchableOpacity
                    activeOpacity={tabActive != "admin" ? 1 : 0.75}
                    style={[
                        styles.button,
                        tabActive != "admin"
                            ? {
                                borderTopRightRadius: 4,
                                borderBottomRightRadius: 4,
                            }
                            : {},
                    ]}
                    onPress={() => props.onTabChange("user")}
                >
                    <Text
                        style={[
                            styles.label,
                            tabActive != "admin"
                                ? { color: "#949799", fontWeight: "600" }
                                : { fontWeight: "normal", color: "#949799" },
                        ]}
                    >
                        {strings.strings.tab_user}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* {tabActive === "admin" ? (
                <MessageAdmin />
            ) : ( */}
            {/* <MessageUser openDetailModal={openDetailModal} openModal={isOpen => openModal(isOpen)} /> */}
            {/* )} */}
        </View>
    );
};
