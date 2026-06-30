export const SITE_URL = 'https://tomasbruckner.dev';
export const EMAIL = 'tomasbrucknermail@gmail.com';

export const SOCIALS = {
  github: 'https://github.com/tomasbruckner',
  stackoverflow: 'https://stackoverflow.com/users/3323141/tomas-bruckner',
  medium: 'https://medium.com/@tomasbruckner',
  linkedin: 'https://www.linkedin.com/in/tomasbruckner',
} as const;

export const LOCALES = ['cs', 'en'] as const;

// Filled in from the Cloudflare dashboard (Web Analytics → JS snippet token).
// Empty string disables the beacon.
export const CF_ANALYTICS_TOKEN = '';
