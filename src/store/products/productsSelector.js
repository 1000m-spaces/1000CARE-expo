export const getListProducts = (state) => state.products.listProducts

export const getStatusProduct = (state) => state.products.statusProduct

export const getProductDetails = (state) => state.products.productDetails
export const getErrorProductDetails = state => state.products.errorMsg

export const getListExclusiveProduct = (state) => state.products.listProductsExclusive
export const getListRecentlyViewedProduct = (state) => state.products.listProductsRecentlyViewed
export const getListProductsOfTrademark = (state) => state.products.listProductsOfTrademark
export const getListProductsHotDeal = (state) => state.products.listProductsHotDeal
export const getListProductsBestSeller = (state) => state.products.listProductsBestSeller
export const getListProductPriceSock = (state) => state.products.listProductPriceSock
export const getListProductPriceSockHome = (state) => state.products.listProductPriceSockHome && state.products.listProductPriceSockHome.length > 0 ? state.products.listProductPriceSockHome : state.products.listProductPriceSock
export const getListProductsPropose = (state, distributorId) => state.products.listProductsProposeByDistributor ? state.products.listProductsProposeByDistributor[distributorId] : []
export const getListProductsByDistributorId = (state, distributorId) => state.products.listProductsByDistributor ? state.products.listProductsByDistributor[distributorId] : []
export const getListProductsBySupplier = (state) => state.products.listProductBySupplier
export const getStatusProductDetail = state => state.products.statusProductDetail
