/**
 * Get product image URL from images_resize with fallback to images array
 * @param {Object} product - Product object containing images and images_resize
 * @param {string} size - Size of image: 'sm' (48px), 'md' (80px), 'lg' (100px), 'xl' (128px)
 * @param {any} placeholder - Fallback placeholder when no image is available
 * @returns {Object|any} - Image source object { uri: string } or placeholder
 */
export const getProductImage = (product, size = 'lg', placeholder = null) => {
    if (!product) {
        return placeholder
    }

    // Try to get from images_resize first
    if (
        product.images_resize &&
        Array.isArray(product.images_resize) &&
        product.images_resize.length > 0 &&
        product.images_resize[0]
    ) {
        const resizedImage = product.images_resize[0][size]
        if (resizedImage) {
            return { uri: resizedImage }
        }
    }

    // Fallback to images array
    if (
        product.images &&
        Array.isArray(product.images) &&
        product.images.length > 0 &&
        product.images[0]
    ) {
        return { uri: product.images[0] }
    }

    return placeholder
}

/**
 * Get all product images from images_resize with fallback to images array
 * @param {Object} product - Product object containing images and images_resize
 * @param {string} size - Size of image: 'sm' (48px), 'md' (80px), 'lg' (100px), 'xl' (128px)
 * @returns {Array<string>} - Array of image URLs
 */
export const getProductImages = (product, size = 'lg') => {
    if (!product) {
        return []
    }

    // Try to get from images_resize first
    if (
        product.images_resize &&
        Array.isArray(product.images_resize) &&
        product.images_resize.length > 0
    ) {
        const resizedImages = product.images_resize
            .map(img => img?.[size])
            .filter(Boolean)
        if (resizedImages.length > 0) {
            return resizedImages
        }
    }

    // Fallback to images array
    if (
        product.images &&
        Array.isArray(product.images) &&
        product.images.length > 0
    ) {
        return product.images.filter(Boolean)
    }

    return []
}

/**
 * Ảnh sản phẩm backend mới (marketplace-core) — `media` là MẢNG
 * {asset_id, kind, position, url, thumb_url, status} (2026-09-18, đổi
 * từ 1 chuỗi URL thẳng trước đó lúc mới migrate). Dùng chung cho mọi
 * màn đọc `product.media`/`item.media` từ AuthV2API (StoreCatalogV2,
 * StoreCartV2, HomeScreen, ProductDetailV2, ProductMessagePreviewV2...)
 * — không tự lấy `item.media` làm uri trực tiếp nữa, sẽ ra ảnh vỡ.
 * @param {Object} product
 * @returns {string|undefined}
 */
export const getV2ProductThumb = product => {
    if (!product?.media) return undefined
    // Phòng trường hợp còn chỗ nào backend/mock cũ chưa kịp đổi shape.
    if (typeof product.media === 'string') return product.media
    if (Array.isArray(product.media) && product.media.length > 0) {
        return product.media[0]?.thumb_url || product.media[0]?.url
    }
    return undefined
}
