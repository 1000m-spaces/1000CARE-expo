import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow, liquidGlass } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'

export default StyleSheet.create({
  // Trang chủ mới (2026-09-17) — banner carousel → NCC nổi bật → gợi ý.
  bannerCarouselWrap: {
    marginBottom: s(16),
  },
  bannerCarousel: {},
  // Bề rộng thật gán inline (= bề rộng màn hình - lề, xem HomeScreen.js
  // BANNER_WIDTH) — KHÔNG có marginRight vì paging phải khớp khít đúng
  // bằng bề rộng ScrollView, cộng thêm lề sẽ làm lệch dần qua từng trang.
  bannerImage: {
    height: s(140),
    borderRadius: s(18),
    backgroundColor: brandColors.tealLight,
  },
  bannerDotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: s(6),
    marginTop: s(10),
  },
  bannerDot: {
    width: s(6),
    height: s(6),
    borderRadius: s(3),
    backgroundColor: brandColors.border,
  },
  bannerDotActive: {
    width: s(18),
    backgroundColor: brandColors.tealPrimary,
  },
  // Khung chờ banner — thanh trượt bo tròn 2 đầu + "viên thuốc" chạy
  // qua lại, theo đúng ý sếp thay vì để trống trơn lúc chưa có dữ liệu.
  bannerLoadingTrack: {
    height: s(28),
    borderRadius: s(999),
    backgroundColor: brandColors.tealLight,
    justifyContent: 'center',
    marginBottom: s(16),
    overflow: 'hidden',
  },
  bannerLoadingCapsule: {
    width: s(48),
    height: s(18),
    marginLeft: s(12),
    borderRadius: s(999),
    backgroundColor: brandColors.tealPrimary,
  },
  featuredSupplierBlock: {
    marginBottom: s(20),
  },
  featuredSupplierBanner: {
    width: '100%',
    height: s(100),
    borderRadius: s(16),
    backgroundColor: brandColors.tealLight,
    marginBottom: s(10),
  },
  supplierProductRail: {
    flexDirection: 'row',
    gap: s(10),
  },
  supplierProductCard: {
    width: s(132),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(14),
    padding: s(10),
  },
  supplierProductSkeletonCard: {
    width: s(132),
    height: s(150),
    borderRadius: s(14),
    backgroundColor: brandColors.tealLight,
  },
  supplierProductImage: {
    width: '100%',
    height: s(90),
    borderRadius: s(10),
    backgroundColor: brandColors.tealLight,
    marginBottom: s(8),
  },
  supplierProductImagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  supplierProductName: {
    color: brandColors.textDark,
    fontSize: fs(11.5),
    fontWeight: '600',
    marginBottom: s(4),
  },
  supplierProductPrice: {
    color: brandColors.tealDark,
    fontSize: fs(12.5),
    fontWeight: '800',
  },
  supplierProductSaleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: s(6),
    flexWrap: 'wrap',
  },
  supplierProductSalePrice: {
    color: brandColors.dangerText,
    fontSize: fs(12.5),
    fontWeight: '800',
  },
  supplierProductOldPrice: {
    color: brandColors.mutedLight,
    fontSize: fs(10.5),
    fontWeight: '600',
    textDecorationLine: 'line-through',
  },
  flashSaleSection: {
    marginBottom: s(20),
  },
  flashSaleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
    marginBottom: s(10),
  },
  flashSaleTitle: {
    color: brandColors.textDark,
    fontSize: fs(15),
    fontWeight: '800',
  },
  flashSaleCampaignBlock: {
    marginBottom: s(8),
  },
  countdownWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: s(6),
    backgroundColor: brandColors.dangerTint,
    borderRadius: s(999),
    paddingHorizontal: s(10),
    paddingVertical: s(5),
    marginBottom: s(10),
  },
  countdownText: {
    color: brandColors.dangerText,
    fontSize: fs(11.5),
    fontWeight: '800',
  },
  suggestionsSection: {
    marginBottom: s(20),
  },
  suggestionsTitle: {
    color: brandColors.textDark,
    fontSize: fs(15),
    fontWeight: '800',
    marginBottom: s(10),
  },
  suggestionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: s(8),
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
    paddingHorizontal: s(12),
    paddingVertical: s(8),
    borderRadius: s(999),
    backgroundColor: brandColors.tealLight,
    maxWidth: s(200),
  },
  suggestionChipText: {
    color: brandColors.tealDark,
    fontSize: fs(12),
    fontWeight: '600',
  },
  // Xem nhanh 1 SP (bấm từ dòng NCC nổi bật) — CHƯA có nút thêm giỏ
  // hàng vì thiếu store_id, xem ghi chú FeaturedSupplierBlock.
  quickViewModalWrap: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  quickViewCard: {
    backgroundColor: brandColors.surface,
    borderTopLeftRadius: s(24),
    borderTopRightRadius: s(24),
    padding: s(24),
    alignItems: 'center',
  },
  quickViewImage: {
    width: s(96),
    height: s(96),
    borderRadius: s(16),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(16),
  },
  quickViewImageInner: {
    width: '100%',
    height: '100%',
  },
  quickViewName: {
    color: brandColors.textDark,
    fontSize: fs(16),
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: s(8),
  },
  quickViewPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
    marginBottom: s(20),
  },
  quickViewPrice: {
    color: brandColors.tealDark,
    fontSize: fs(18),
    fontWeight: '800',
  },
  quickViewRxBadge: {
    color: brandColors.dangerText,
    backgroundColor: brandColors.dangerTint,
    fontSize: fs(10.5),
    fontWeight: '800',
    paddingHorizontal: s(8),
    paddingVertical: s(3),
    borderRadius: s(6),
    overflow: 'hidden',
  },
  quickViewCloseButton: {
    width: '100%',
    height: s(48),
    borderRadius: s(14),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickViewCloseText: {
    color: brandColors.tealDark,
    fontSize: fs(14),
    fontWeight: '700',
  },
  // Danh sách "Store" (marketplace-core) thay hẳn khối
  // banner/distributor/deal-hời/bán-chạy NeoMed cũ ở Home — 2026-09-16.
  homeStoreList: {
    flex: 1,
  },
  homeStoreListContent: {
    paddingHorizontal: s(20),
    paddingTop: s(4),
    paddingBottom: s(120),
    flexGrow: 1,
  },
  homeStoreListHeader: {
    marginBottom: s(16),
  },
  homeStoreListTitle: {
    color: brandColors.textDark,
    fontSize: fs(19),
    fontWeight: '800',
  },
  homeStoreListSubtitle: {
    marginTop: s(4),
    color: brandColors.muted,
    fontSize: fs(12.5),
    fontWeight: '600',
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(16),
    padding: s(14),
    marginBottom: s(12),
    ...brandShadow.soft,
  },
  storeCardIcon: {
    width: s(44),
    height: s(44),
    borderRadius: s(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.tealLight,
  },
  storeCardBody: {
    flex: 1,
  },
  storeCardName: {
    color: brandColors.textDark,
    fontSize: fs(14.5),
    fontWeight: '700',
  },
  storeCardAddress: {
    marginTop: s(3),
    color: brandColors.muted,
    fontSize: fs(11.5),
    fontWeight: '600',
  },
  homeStoreEmptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: s(60),
    gap: s(10),
  },
  homeStoreEmptyText: {
    color: brandColors.mutedLight,
    fontSize: fs(13),
    fontWeight: '600',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImageAsset: {
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  backgroundBrightener: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
  },
  contentLayer: {
    flex: 1,
  },
  supplierContentLayer: {
    paddingTop: s(84),
  },
  // BUG đã sửa (2026-09-16, sếp báo có 1 icon xoay bị "đứng hình" giữa
  // header): header trước `position:absolute` đè LÊN TRÊN FlatList, nên
  // spinner pull-to-refresh gốc của hệ điều hành (render bên trong vùng
  // scroll, phía dưới lớp overlay trong suốt) hiện xuyên qua đúng hàng
  // icon header — nhìn như 1 icon lạ đứng yên. Đổi hẳn header về flow
  // bình thường (không còn absolute/zIndex/scrim) nằm TRÊN FlatList,
  // spinner giờ hiện đúng chỗ (ngay dưới header, trong vùng scroll).
  marketHeader: {
    paddingHorizontal: s(16),
    paddingTop: s(8),
    paddingBottom: s(10),
    backgroundColor: 'transparent',
  },
  marketHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
    zIndex: 2,
  },
  // Chỗ trống thu được sau khi rút gọn thanh tìm kiếm thành icon — đẩy
  // nút chat + giỏ hàng sang phải, search giữ nguyên bên trái.
  marketHeaderSpacer: {
    flex: 1,
  },
  brandMark: {
    width: s(42),
    height: s(42),
    borderRadius: s(18),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: liquidGlass.background,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    overflow: 'hidden',
    ...liquidGlass.shadow,
  },
  brandLogo: {
    width: s(40),
    height: s(40),
  },
  brandCopy: {
    flex: 1,
    marginLeft: s(12),
  },
  headerEyebrow: {
    fontFamily: Fonts.semiBold,
    fontSize: fs(16),
    lineHeight: fs(21),
    fontWeight: 'normal',
    letterSpacing: 2.2,
    color: brandColors.tealDark,
  },
  headerTitle: {
    marginTop: s(1),
    fontFamily: Fonts.semiBold,
    fontSize: fs(12),
    lineHeight: fs(16),
    fontWeight: 'normal',
    color: brandColors.muted,
  },
  cartTouch: {
    width: s(42),
    height: s(42),
    borderRadius: s(18),
    overflow: 'visible',
  },
  cartPill: {
    width: '100%',
    height: '100%',
    borderRadius: s(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.border,
    ...brandShadow.soft,
  },
  cartBadge: {
    position: 'absolute',
    top: -s(6),
    right: -s(6),
    minWidth: s(22),
    height: s(22),
    borderRadius: s(11),
    paddingHorizontal: s(5),
    backgroundColor: brandColors.danger,
    borderWidth: 2,
    borderColor: brandColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    fontFamily: Fonts.semiBold,
    fontSize: fs(11),
    lineHeight: fs(14),
    fontWeight: 'normal',
    color: brandColors.surface,
  },
  // Thanh tìm kiếm dời từ header xuống đầu nội dung cuộn (2026-09-19,
  // header giờ CHỈ còn nút chat) — dạng thanh đầy đủ thay vì icon tròn,
  // dễ nhận ra hơn khi không còn nằm cạnh các nút khác trong header.
  searchEntryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    height: s(44),
    borderRadius: s(22),
    paddingHorizontal: s(16),
    marginBottom: s(16),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.border,
    ...brandShadow.soft,
  },
  searchEntryText: {
    color: brandColors.mutedLight,
    fontSize: fs(13),
    fontWeight: '600',
  },
  headerMetrics: {
    marginTop: s(10),
    minHeight: s(42),
    borderRadius: s(16),
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(10),
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricValue: {
    fontFamily: Fonts.semiBold,
    fontSize: fs(13),
    lineHeight: fs(17),
    fontWeight: 'normal',
    color: brandColors.surface,
  },
  metricLabel: {
    marginTop: 0,
    fontFamily: Fonts.semiBold,
    fontSize: fs(9),
    lineHeight: fs(12),
    fontWeight: 'normal',
    color: 'rgba(255,255,255,0.68)',
  },
  metricDivider: {
    width: 1,
    height: s(22),
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  distributors: {
    paddingHorizontal: s(12),
    paddingVertical: s(10),
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  listDistributors: {
    flexGrow: 0,
    backgroundColor: 'transparent',
    marginBottom: s(2),
  },
  viewContent: {
    backgroundColor: brandColors.surface,
    padding: s(20),
    height: s(300),
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: s(24),
    ...brandShadow.soft,
  },
  image: {
    height: s(120),
    width: s(120)
  },
  buttonUpdate: {
    padding: s(10),
    height: s(50),
    backgroundColor: Colors.colorMain
  },
  textUpdate: {
    color: brandColors.surface
  },
  textVerApp: {
    fontSize: fs(16),
    textAlign: 'center',
    marginTop: s(5),
    color: brandColors.textDark,
  }
})
