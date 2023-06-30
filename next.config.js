/** @type {import('next').NextConfig} */

const nextConfig = {
    // reactStrictMode: true,
    productionBrowserSourceMaps: true,
    images: {
        domains: [
        "devocxstorage.blob.core.windows.net",
        "devocxblob.blob.core.windows.net",
        "liveocxstorage.blob.core.windows.net",
        "liveocxcdn.azureedge.net",
        "liveocx.imgix.net"
        ],
    },
    env: {
      BASE_URL: process.env.BASE_URL,
      AUTH_BASE_URL: process.env.AUTH_BASE_URL,
      API_URL: process.env.API_URL,
      AUTH_CURRENT_MODULE: process.env.AUTH_CURRENT_MODULE,
      AUTH_COOKIE_VALIDATION_ENABLED: process.env.AUTH_COOKIE_VALIDATION_ENABLED,
      PREVIEW_PREFIX_URL: process.env.PREVIEW_PREFIX_URL,
      BETTERSITE_PREVIEW_URL: process.env.BETTERSITE_PREVIEW_URL,
      DAMENSCH_PREVIEW_URL: process.env.DAMENSCH_PREVIEW_URL,
      GRID_PAGE_SIZE: process.env.GRID_PAGE_SIZE,
      GRID_PAGING_ENABLED: process.env.GRID_PAGING_ENABLED,
      EDIT_PAGE_AUTO_SAVE_ENABLED: process.env.EDIT_PAGE_AUTO_SAVE_ENABLED,
      EDIT_PAGE_AUTO_SAVE_INTERVAL_IN_SECS: process.env.EDIT_PAGE_AUTO_SAVE_INTERVAL_IN_SECS,
      CIPHER_ENCRYPTION_KEY: process.env.CIPHER_ENCRYPTION_KEY,
      ENABLE_ALERT_LOG: process.env.ENABLE_ALERT_LOG,
      AG_GRID_LICENSE_KEY: process.env.AG_GRID_LICENSE_KEY,
    },
  }
  
  module.exports = nextConfig
  
