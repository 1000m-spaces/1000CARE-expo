import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, View, ActivityIndicator, Alert, ScrollView } from 'react-native'
import { back } from '~/assets/constants'
import Header from '~/common/Header/index'
import { Text, Button, SkeletonLoader } from '~/common/index'
import styles from './styles'
import { VietQr } from '~/neomed'
import { useSelector } from 'react-redux'
import { getUserId } from '~/store/selector'
import QRCode from 'react-native-qrcode-svg'
import Colors from '~/common/Colors/Colors'
import { formatMoney } from '~/utils/format'

const POLLING_INTERVAL = 3000 // Check payment status every 3 seconds
const MAX_POLLING_ATTEMPTS = 100 // Maximum 5 minutes (100 * 3 seconds)

const VietQrPaymentScreen = ({ navigation, route }) => {
    const {
        distributor_id,
        order_amount,
        onPaymentSuccess,
        onPaymentCancel,
    } = route.params

    const userId = useSelector(state => getUserId(state))

    const [loading, setLoading] = useState(true)
    const [qrData, setQrData] = useState(null)
    const [error, setError] = useState(null)
    const [paymentStatus, setPaymentStatus] = useState('pending') // pending, checking, success, failed
    const [pollingAttempts, setPollingAttempts] = useState(0)

    const pollingIntervalRef = useRef(null)
    const appTransIdRef = useRef(null)

    // Generate QR Code on mount
    useEffect(() => {
        generateQRCode()

        return () => {
            // Cleanup polling on unmount
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current)
            }
        }
    }, [])

    const generateQRCode = async () => {
        try {
            setLoading(true)
            setError(null)

            // Generate a unique order_id for this transaction
            const tempOrderId = `TEMP_${Date.now()}_${distributor_id}`

            const response = await VietQr.generateQR({
                brand_id: 100, // Marketplace brand ID
                merchant_id: distributor_id,
                branch_id: distributor_id,
                order_id: tempOrderId,
                amount: order_amount,
                user_id: userId?.toString() || '0',
            })

            console.log('VietQR Generate Response:', response)

            if (response && response.qr_code) {
                setQrData(response)
                appTransIdRef.current = response.app_trans_id

                // Start polling for payment status
                startPaymentStatusPolling(response.app_trans_id)
            } else {
                throw new Error('Không thể tạo mã QR thanh toán')
            }

            setLoading(false)
        } catch (err) {
            console.error('Generate QR Error:', err)
            setError(err.message || 'Có lỗi xảy ra khi tạo mã QR')
            setLoading(false)
        }
    }

    const startPaymentStatusPolling = (appTransId) => {
        setPaymentStatus('checking')

        pollingIntervalRef.current = setInterval(async () => {
            try {
                const statusResponse = await VietQr.checkPaymentStatus(appTransId)
                console.log('Payment Status Response:', statusResponse)

                setPollingAttempts(prev => prev + 1)

                // Check if payment is successful (status "00" means success)
                if (statusResponse && statusResponse.status === '00') {
                    // Payment successful
                    clearInterval(pollingIntervalRef.current)
                    setPaymentStatus('success')

                    Alert.alert(
                        'Thanh toán thành công',
                        'Thanh toán VietQR đã được xác nhận. Đơn hàng của bạn đang được xử lý.',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    // Notify parent before removing screen
                                    if (onPaymentSuccess) {
                                        onPaymentSuccess(appTransId)
                                    }
                                    // Remove current screen from stack
                                    navigation.pop()
                                },
                            },
                        ]
                    )
                } else if (pollingAttempts >= MAX_POLLING_ATTEMPTS) {
                    // Timeout
                    clearInterval(pollingIntervalRef.current)
                    setPaymentStatus('failed')

                    Alert.alert(
                        'Hết thời gian chờ',
                        'Không nhận được xác nhận thanh toán. Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ.',
                        [
                            {
                                text: 'OK',
                                onPress: () => handleCancel(),
                            },
                        ]
                    )
                }
            } catch (err) {
                console.error('Check Payment Status Error:', err)
            }
        }, POLLING_INTERVAL)
    }

    const handleCancel = () => {
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current)
        }

        if (onPaymentCancel) {
            onPaymentCancel()
        }

        navigation.goBack()
    }

    const handleRetry = () => {
        setPollingAttempts(0)
        generateQRCode()
    }

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header
                    title="Thanh toán VietQR"
                    leftAction={handleCancel}
                    iconLeft={back}
                />
                <SkeletonLoader variant="checkout" withHeader={false} />
            </SafeAreaView>
        )
    }

    if (error) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header
                    title="Thanh toán VietQR"
                />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <Button
                        onPressEvent={handleRetry}
                        text="Thử lại"
                        styleButton={styles.retryButton}
                    />
                    <Button
                        onPressEvent={handleCancel}
                        text="Hủy"
                        styleButton={styles.cancelButton}
                    />
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                title="Thanh toán VietQR"
                leftAction={handleCancel}
                iconLeft={back}
            />
            <ScrollView style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Quét mã QR để thanh toán</Text>

                    <View style={styles.qrContainer}>
                        {qrData?.qr_code && (
                            <QRCode
                                value={qrData.qr_code}
                                size={250}
                                color="black"
                                backgroundColor="white"
                            />
                        )}
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Ngân hàng:</Text>
                            <Text style={styles.infoValue}>{qrData?.bank_name || 'N/A'}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Số tài khoản:</Text>
                            <Text style={styles.infoValue}>{qrData?.bank_account || 'N/A'}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Chủ tài khoản:</Text>
                            <Text style={styles.infoValue}>{qrData?.user_bank_name || 'N/A'}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Số tiền:</Text>
                            <Text style={[styles.infoValue, styles.amountText]}>
                                {formatMoney(order_amount, { unit: 'đ' })}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Nội dung:</Text>
                            <Text style={[styles.infoValue, styles.contentText]} numberOfLines={2}>
                                {qrData?.content || 'N/A'}
                            </Text>
                        </View>
                    </View>

                    {paymentStatus === 'checking' && (
                        <View style={styles.statusContainer}>
                            <ActivityIndicator size="small" color={Colors.primary} />
                            <Text style={styles.statusText}>
                                Đang chờ xác nhận thanh toán...
                            </Text>
                        </View>
                    )}

                    <View style={styles.instructionContainer}>
                        <Text style={styles.instructionTitle}>Hướng dẫn thanh toán:</Text>
                        <Text style={styles.instructionText}>
                            1. Mở ứng dụng ngân hàng hoặc ví điện tử{'\n'}
                            2. Chọn chức năng quét mã QR{'\n'}
                            3. Quét mã QR hiển thị trên màn hình{'\n'}
                            4. Xác nhận thông tin và hoàn tất thanh toán{'\n'}
                            5. Hệ thống sẽ tự động xác nhận khi thanh toán thành công
                        </Text>
                    </View>

                    <Button
                        onPressEvent={handleCancel}
                        text="Hủy thanh toán"
                        styleButton={styles.cancelButtonBottom}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default VietQrPaymentScreen
