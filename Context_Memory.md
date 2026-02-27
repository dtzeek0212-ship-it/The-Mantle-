# Context Memory - The Mantle

## Project Progress

- **Initialization**: React Native Expo project initialized with TypeScript.
- **Dependencies**: React Navigation (Bottom Tabs, Native Stack), Expo Camera, Expo Image Picker, Reanimated, Gesture Handler, and Lucide Icons installed.
- **Directory Structure**: Base directories created.
- **Global Styling**: "Industrial Modern" theme implemented (Dark Mode only) with strict rules for `#FF6600` primary buttons, `#1E1E1E` surfaces, and 8px border radii.
- **Workshop Module**:
  - `AIAssistantScreen`: Built text/photo chat interface mocked for Gemini capabilities.
  - `ARBlueprintScreen`: Built simulated AR point dropping over a live camera feed.
  - `ProConnectScreen`: Built searchable trades directory with "Verified" state UI and mock data linking.
- **Command Center Module**:
  - `ScoreTicker`: Implemented horizontally scrolling live sports ticker (NFL, NBA, MLB, NHL, UFC).
  - `PickEm`: Built betting system UI allowing users to wager virtual "Cred" on upcoming matchups.
- **Iron Works Module**:
  - `useBiometrics`: Abstracted HealthKit/Google Fit logic (using realistic mock data for dev environment).
  - `TacticalWorkoutScreen`: Dynamic workout recommendation UI driven by Recovery Score biometrics.
  - `FuelStationScreen`: Mock Gemini Vision UI for analyzing food photos to extract Protein/Carb/Fat macros.
- **Pro Shop Module**:
  - `AppContext`: Built a global Cred tracker and `activeContext` state manager.
  - `NativeAdBanner`: Triggers contextually based on what the user is doing (e.g. Workshop -> Plumbing -> Pipe Wrench Ad).
  - `CheckoutScreen`: Implements the "Cred Economy" by applying discounts based on global Cred balance.

## Active APIs

- (None yet. Mocks used for Gemini AI in `AIAssistantScreen`.)

## State Management & Inter-Module Architecture

- **Global State Context (`AppContext`)**: We upgraded the app from isolated local state to a unified global React Context (`AppProvider`) wrapping the main `App.tsx`. This established a core architectural bridge allowing completely separate modules to communicate and build upon one another:
  - **The Cred Economy (Command Center ↔ Pro Shop)**: The `credBalance` was lifted into `AppContext`. When a user wagers and wins/loses virtual 'Cred' inside the `CommandCenterScreen`'s Pick-em game (old code), that exact balance is mutated globally. The new `CheckoutScreen` (inside the Pro Shop module) actively consumes this global `credBalance` to mathematically calculate and offer real-time discount options at checkout.
  - **Contextual Triggers (Workshop ↔ Pro Shop)**: The `activeContext` state was introduced to track user intent. We altered the previously built `AIAssistantScreen` (Workshop module) so that when the AI delivers mock plumbing advice, it calls `setActiveContext('plumbing')`. A new globally accessible component, `NativeAdBanner` (built in the Pro Shop), is injected directly into the Workshop's UI. It constantly listens to `activeContext` and conditionally renders a targeted advertisement (e.g., a "Buy this Pipe Wrench" banner) only when the specific trigger aligns, driving targeted traffic from utility features straight into monetization.
- Local component state via `useState` is still used for isolated UI toggles.
- Navigation state managed globally by `react-navigation` (Bottom Tabs & Native Stack).
- Mock data loaded via static `.json` payloads (`tradesmen.json`, `sports.json`).

## Current Focus

- Ready for next module execution per User Request.
