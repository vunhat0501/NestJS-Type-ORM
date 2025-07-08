import { SetMetadata } from '@nestjs/common';

//** This decorator is used to mark a route or controller as public,
// * meaning it does not require authentication to access. */
export const PUBLIC_KEY = 'IS_PUBLIC';
export const Public = () => SetMetadata(PUBLIC_KEY, true);
