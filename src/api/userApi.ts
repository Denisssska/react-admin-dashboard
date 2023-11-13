import { ProfileSchemaType, SignInSchemaType, SignUpSchemaType } from '../utils';

export const userApi = {
  async signIn({ email, password }: SignInSchemaType): Promise<ProfileSchemaType> {
    return await fetch(`/auth/signin`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  },
  async registration({ email, password, username }: SignUpSchemaType) {
    return await fetch(`/auth/signup`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });
  },
};
