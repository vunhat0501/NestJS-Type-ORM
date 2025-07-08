import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';

//** Memories the roles metadata key
// * This key is used to check the roles of the user in the guards */

export const ROLE_KEY = 'roles';

//** Set roles in metadata as an array so that the role can't be null */
export const Roles = (...roles: [Role, ...Role[]]) =>
	SetMetadata(ROLE_KEY, roles);
