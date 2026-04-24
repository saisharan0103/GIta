# PLAN.md

Living roadmap for the Gita app. Agents and humans update this as tasks complete.

**Convention:**
- `[ ]` = not done
- `[x]` = done
- `[~]` = in progress
- `[!]` = blocked or needs input

---

## Phase 0 — Setup (foundation)

- [x] Run `npx create-expo-app Gita --template blank-typescript`
- [x] `cd Gita` and install deps:
  ```
  npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-safe-area-context react-native-screens expo-av
  npm install lucide-react-native
  npm install -D @types/react
  ```
- [x] Create folder structure from AGENTS.md
- [x] Add `.env` with `GEMINI_API_KEY=...` and `.env.example`
- [x] Add `.env` to `.gitignore`
- [x] Drop `gita.json` into `assets/data/gita.json`
- [x] Create `src/types/index.ts` with the `Verse` type
- [x] Create `src/constants/colors.ts` with calm palette (cream `#FBF7F0`, soft saffron `#D4873C`, deep blue `#1E3A5F`, soft text `#2D2D2D`)
- [x] Set up `RootNavigator.tsx` with bottom tabs (Home, Reels) + stack wrapping for modal chat
- [ ] Verify: app boots on Expo Go with empty Home and Reels screens

---

## Phase 1 — Home screen + verse feed

- [x] Create `hooks/useVerses.ts` that imports `gita.json` and returns shuffled verses
- [x] Create `components/VerseCard.tsx` — clean card with meaning text + small chapter.verse reference
- [x] Build `HomeScreen.tsx`:
  - [x] App title header
  - [x] `KrishnaEntryBar` placeholder (non-functional for now)
  - [x] `FlatList` of VerseCards
- [ ] Test scroll performance on device
- [ ] Design polish: padding, line-height, calm typography (system font is fine for v1)

**Done when:** scrolling feels smooth, text is readable, UI feels calm.

---

## Phase 2 — Krishna chat

- [x] Create `constants/krishnaSystemPrompt.ts` — see Krishna chat rules in AGENTS.md
- [ ] Create `services/gemini.ts`:
  - [ ] Function: `askKrishna(messages: ChatMessage[]): Promise<string>`
  - [ ] Reads `GEMINI_API_KEY` from env
  - [ ] POST to Gemini `generateContent` endpoint
  - [ ] System prompt prepended every call
  - [ ] Handle errors gracefully (network, rate limit)
- [ ] Build `KrishnaChatScreen.tsx`:
  - [ ] Header with back button ("Krishna")
  - [ ] Message list (user right, Krishna left)
  - [ ] Input + send button at bottom
  - [ ] Typing indicator while awaiting response
  - [ ] Empty state: soft prompt like "Share what's on your mind."
- [x] Wire `KrishnaEntryBar` on Home to `navigation.navigate('KrishnaChat')`
- [ ] Test: end-to-end conversation works

**Done when:** tapping the bar opens chat, you can talk to Krishna and get thoughtful responses.

---

## Phase 3 — Reels

- [ ] Source 50–80 calm background images → drop in `assets/images/` (nature, temples, sunrises, soft abstracts)
- [ ] Source 50–80 ambient audio clips 30–40 sec each → `assets/audio/`
  - [ ] Only royalty-free / Pixabay-licensed tracks
- [ ] Create `utils/reelTiming.ts` → `calcDuration(meaning: string): number` returning seconds
- [ ] Create `hooks/useRandomReel.ts` → returns `{ verse, imageSrc, audioSrc, durationSec }`
- [ ] Build `components/Reel.tsx`:
  - [ ] Full-screen background Image with subtle dark gradient overlay
  - [ ] **Sanskrit verse on top** (Devanagari, softer/smaller)
  - [ ] **English meaning below** (primary, larger, clear)
  - [ ] Staggered fade-in: Sanskrit first, then English meaning
  - [ ] Audio playing via `expo-av`
  - [ ] Bottom-right: `chapter.verse` marker
- [ ] Build `ReelsScreen.tsx`:
  - [ ] Vertical `FlatList` with `pagingEnabled` and `snapToAlignment="start"`
  - [ ] New random reel per swipe
  - [ ] Pause audio when screen loses focus
- [ ] Test: swipe feels native, text is readable over varied backgrounds (add subtle dark gradient overlay if needed)

**Done when:** you can swipe through reels, each feels different, audio/visual feels calming not cluttered.

---

## Phase 4 — Polish

- [ ] Dark mode support (auto via system)
- [ ] Subtle haptic on swipe/tap (`expo-haptics`)
- [ ] App icon + splash screen (calm saffron gradient or simple OM/lotus mark)
- [ ] Favorite verses: long-press on VerseCard → save to AsyncStorage
- [ ] Simple "About" screen accessible from a small icon in Home header
- [ ] Test on both iOS and Android simulators

**Done when:** feels like a real product, not a demo.

---

## Phase 5 — Deferred (maybe never, that's fine)

- [ ] Settings screen
- [ ] Notifications (morning + evening)
- [ ] Mood → verse recommendation
- [ ] Multi-language support
- [ ] Sync favorites across devices

---

## Known constraints / decisions

- **v1 is offline-first except Krishna chat.** Everything else works without internet.
- **Gemini chosen over OpenAI/Claude** because of free tier availability for this project.
- **103 verses is enough** for v1. Don't expand the dataset until the app feels solid.
- **No deployment planned.** Personal build. Goodness matters more than polish-for-strangers.

---

## Open questions (flag for human)

- [ ] Should Home feed be shuffled per session or deterministic per day?
- [ ] Should we include Sanskrit on Home cards, or only on an expanded verse view?
- [ ] How many simultaneous audio clips can play without lag on low-end Android? (test later)
