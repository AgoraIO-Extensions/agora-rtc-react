# Agora RTC React MobX Example

- MobX for state management.
- Custom user name and avatar.
- Create tracks on demand.

<https://agoraio-extensions.github.io/agora-rtc-react/mobx/>

## Develop

1. Add a `.env.local` file to this directory and fill in the Agora account info following the format of `.env.example`.
   - You can also add a `.env.local` at monorepo root with `AGORA_APPID` and `AGORA_CERTIFICATE`, then `pnpm renew` to auto-renew tokens.
2. `pnpm run start`.
