export const userApi = {
 async signIn({ email, password }: SignInPayload) {

    return await fetch(`/auth/signin`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password}),
    });


  },
  registration({ email, password, username }: SignUpPayload) {
    return fetch(`/auth/signup`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });
  },
};
