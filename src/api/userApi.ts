import customFetch from '../components/hooks/customFetch';

import { SignInSchemaType, SignUpSchemaType } from '../utils';

export const userApi = {
  async signIn({ email, password }: SignInSchemaType) {
    return await fetch(`/auth/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  },
  async registration({ email, password, username }: SignUpSchemaType) {
    return await fetch(`/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });
  },

  async updateUser(data: FormData) {
    const userId = data.get('_id');
    return await customFetch(`/user/${userId}`, {
      method: 'PATCH',
      body: data,
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      },
    });
    // return await fetch(`http://localhost:8800/user/${userId}`, {
    //   method: 'PATCH',
    //   headers: {
    //     Accept: 'application/json',
    //     // 'Content-Type': 'multipart/form-data',
    //   },
    //   body: data,
    // });
  },
};
