let productionSetup = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || "3306",
  DB_DATABASE: process.env.DB_DATABASE || "e_ticket_pro_odb",
  DB_USER: process.env.DB_USER || "e_ticket_pro_user",
  DB_PASSWORD: process.env.DB_PASSWORD || "r00t",
  APP_SERVER_NAME: process.env.APP_SERVER_NAME || "http://somayar.ddns.net:8080",
  API_USER_ENDPOINT: process.env.API_USER_ENDPOINT || "/api",
  CMI_CC5REQUEST_NAME: process.env.CMI_CC5REQUEST_NAME || "user_api",
  CMI_CC5REQUEST_CLIENT_ID: process.env.CMI_CC5REQUEST_CLIENT_ID || "600002972",
  CMI_CC5REQUEST_PASSWORD: process.env.CMI_CC5REQUEST_PASSWORD || "PASS1234",
  CMI_CC5REQUEST_CURRENCY: process.env.CMI_CC5REQUEST_CURRENCY || "504",
  CMI_CC5REQUEST_ENDPOINT: process.env.CMI_CC5REQUEST_ENDPOINT || "https://testpayment.cmi.co.ma/fim/api"
}

let developmentSetup = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || "3306",
  DB_DATABASE: process.env.DB_DATABASE || "e_ticket_pro_odb",
  DB_USER: process.env.DB_USER || "e_ticket_pro_user",
  DB_PASSWORD: process.env.DB_PASSWORD || "r00t",
  APP_SERVER_NAME: process.env.APP_SERVER_NAME || "http://somayar.ddns.net:8080",
  API_USER_ENDPOINT: process.env.API_USER_ENDPOINT || "/api",
  CMI_CC5REQUEST_NAME: process.env.CMI_CC5REQUEST_NAME || "user_api",
  CMI_CC5REQUEST_CLIENT_ID: process.env.CMI_CC5REQUEST_CLIENT_ID || "600002972",
  CMI_CC5REQUEST_PASSWORD: process.env.CMI_CC5REQUEST_PASSWORD || "PASS1234",
  CMI_CC5REQUEST_CURRENCY: process.env.CMI_CC5REQUEST_CURRENCY || "504",
  CMI_CC5REQUEST_ENDPOINT: process.env.CMI_CC5REQUEST_ENDPOINT || "https://testpayment.cmi.co.ma/fim/api"
}

module.exports = {
  reactStrictMode: false,
  transpilePackages: ['@mui/x-charts'],
  output: 'standalone',
  env: process.env.NODE_ENV === "production" ? productionSetup : developmentSetup
};
