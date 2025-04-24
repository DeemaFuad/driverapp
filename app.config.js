import 'dotenv/config';

export default {
  expo: {
    name: "MyDriverApp",
    slug: "MyDriverApp",
    version: "1.0.0",
    extra: {
      API_BASE_URL: process.env.API_BASE_URL || 'http://192.168.100.120:5000/api',
    },
  }
}; 