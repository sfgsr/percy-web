export default {
  auth: {
    redirect: true,
    redirectUrl: `${window.location.origin}/api/auth/auth0/callback`,
    responseType: 'code',
    params: {},
  },
  languageDictionary: {
    title: 'Percy',
    emailInputPlaceholder: 'Email',
    passwordInputPlaceholder: 'Password',
  },
  theme: {
    logo: 'https://percy.io/static/images/percy-1f98595db6111fe2e1c86f8fbae815bc.svg',
    primaryColor: '#5c007b',
  },
  socialButtonStyle: 'big',
  autoclose: true,
  autofocus: true,
  closable: true,
};
