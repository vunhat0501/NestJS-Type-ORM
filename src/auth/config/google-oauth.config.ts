import { registerAs } from '@nestjs/config';

export default registerAs('googleOAuth', () => ({
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_SECRET,
	callbackURl: process.env.GOOGLE_CALLBACK_URL,
}));
