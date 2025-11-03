import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// generete @Public() decorator
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
