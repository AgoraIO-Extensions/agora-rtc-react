# Agora RTC React Overview Multi-Channel

Demonstrates how to use Agora RTC React SDK to build a multi-channel application.

- Zustand for state management.
- Each channel is handled by a client. With `AgoraRTCProvider` the rest of the Components consume the client in a dependency injection manner, without caring which client is provided.

<https://netless-io.github.io/agora-rtc-react/multi-channel/>

## Develop

1. Add a `.env.local` at monorepo root with `AGORA_APPID` and `AGORA_CERTIFICATE`, then `pnpm renew` to auto-renewing tokens.
   - Or you have to add a `.env.local` file to monorepo root and fill in the Agora account info following the format of `.env.example`.
2. `pnpm run start`.
