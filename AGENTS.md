# AGENTS.md

This file is the onboarding doc for any AI coding agent (Codex, Claude Code, Cursor) working on this repo. Read this first before making any changes.

---

## Version control workflow

This GitHub repository is the source of truth:

`https://github.com/saisharan0103/GIta.git`

For every user prompt that changes code, docs, assets, config, or project state:

1. Before implementing the requested change, commit and push the current working state to the current branch if there are uncommitted changes.
2. Implement the requested change.
3. Run the relevant validation command when practical, at minimum `npx tsc --noEmit` for TypeScript changes.
4. Commit the completed change with a clear message.
5. Push the branch to `origin` so the latest version is recoverable from GitHub.

Do not commit `.env` or any secrets. Keep `.env` ignored and use `.env.example` for templates.

---

## Project: Gita

A calm, minimal Bhagavad Gita mobile app. Three screens: **Home** (scrollable verse feed + Krishna chat entry), **Reels** (swipeable short spiritual clips), and **Krishna Chat** (AI-powered Krishna-inspired guidance, opened from Home).

Goal for v1: personal project, satisfying quality, no deployment. Keep it simple, calm, and shippable.

---

## Tech stack (fixed — don't change without asking)

- **Framework:** React Native + Expo (managed workflow)
- **Language:** TypeScript
- **Navigation:** `@react-navigation/native` + bottom tabs + stack (for Krishna chat modal from Home)
- **State:** React hooks only (`useState`, `useReducer`, `useContext`). No Redux, no Zustand in v1.
- **Storage:** `AsyncStorage` for favorites/saved verses. No backend, no login.
- **AI chat:** Google Gemini API (`gemini-pro` via REST). API key in `.env`, accessed via `expo-constants` or `react-native-dotenv`.
- **Audio:** `expo-av`
- **Images:** local bundled assets
- **Icons:** `lucide-react-native`
- **Styling:** StyleSheet (RN built-in). No styled-components, no Tailwind.

---

## Folder structure

```
Gita/
├── App.tsx                     # Entry, wraps NavigationContainer
├── app.json                    # Expo config
├── .env                        # GEMINI_API_KEY (never commit)
├── .env.example                # Template
├── AGENTS.md                   # This file
├── PLAN.md                     # Living roadmap
├── README.md
├── assets/
│   ├── images/                 # 50-80 bg images for reels (calm, natural, spiritual)
│   ├── audio/                  # 50-80 ambient music clips (30-40 sec each)
│   └── data/
│       └── gita.json           # 103 hand-curated verses
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── ReelsScreen.tsx
│   │   └── KrishnaChatScreen.tsx
│   ├── components/
│   │   ├── KrishnaEntryBar.tsx   # ChatGPT-style entry card on Home
│   │   ├── VerseCard.tsx         # Single verse in scroll feed
│   │   ├── Reel.tsx              # Single reel (bg + text + audio)
│   │   └── ChatBubble.tsx
│   ├── services/
│   │   └── gemini.ts             # Gemini API client + Krishna system prompt
│   ├── hooks/
│   │   ├── useRandomReel.ts
│   │   └── useVerses.ts
│   ├── navigation/
│   │   └── RootNavigator.tsx
│   ├── utils/
│   │   ├── reelTiming.ts         # duration from word count
│   │   └── shuffle.ts
│   ├── constants/
│   │   ├── colors.ts             # calm palette (cream, soft saffron, dark blue)
│   │   └── krishnaSystemPrompt.ts
│   └── types/
│       └── index.ts              # Verse, ChatMessage, etc.
└── package.json
```

Agents: when adding a file, follow this structure. Don't dump everything in `App.tsx`.

---

## Data model (gita.json)

Each entry:
```ts
type Verse = {
  id: string;              // "bg_2_47"
  chapter: number;
  verse: number;
  sanskrit: string;        // Devanagari
  meaning: string;         // modern English, 2-4 sentences
  theme: string;           // "karma-yoga", "duty", "devotion", etc.
  mood_tags: string[];     // ["anxiety", "overthinking", ...]
};
```

- Read from `assets/data/gita.json` using `import`. It's bundled at build time.
- Never fetch verses over network. The file is the source of truth.
- If new verses are added, they must follow this exact shape.

---

## Screen behaviour

### Home screen
- Top: app title ("Gita"), small and centered
- Just below: **Krishna entry bar** — a ChatGPT-style tappable card/input that reads "Talk with Krishna..." — on tap, pushes `KrishnaChatScreen` (modal from stack)
- Below: scrollable feed of verse cards (English `meaning` only, no Sanskrit on home for calm UI)
- Each card: short meaning + small `chapter.verse` reference at bottom
- Order: shuffled once per session, or deterministic by day (pick one — shuffle is simpler for v1)
- No infinite scroll gimmicks. Just a plain FlatList.

### Reels screen
- Vertical swipe (`FlatList` with `pagingEnabled` and `vertical`)
- Each reel:
  - Random image from `assets/images/` as full-screen background (`resizeMode: 'cover'`)
  - Subtle dark gradient overlay on image so text stays readable
  - Random audio clip from `assets/audio/` playing in loop via `expo-av`
  - **Text content (this is the core of the reel):**
    - **Sanskrit verse on top** (Devanagari, slightly smaller, softer color/opacity)
    - **English meaning below it** (primary emphasis, larger, clear)
    - Both fade in with subtle animation (Sanskrit first, then meaning)
  - Duration auto-calculated from English meaning word count: `seconds = (wordCount / 3) + 5`
- No video generation. It's just components rendering. Cheap.
- Random selection happens at mount. Re-shuffle on swipe.
- Pause audio when user leaves the screen.

### Krishna chat screen
- Standard chat UI: message list + input at bottom
- System prompt lives in `constants/krishnaSystemPrompt.ts` — see **Krishna chat rules** below
- Calls Gemini API via `services/gemini.ts`
- Show typing indicator while waiting
- Chat history kept in screen state. No persistence in v1.

---

## Krishna chat rules (important — read carefully)

This is a religious context. Sloppy prompting = disrespectful or dangerous output.

1. **Framing:** The assistant is *"Krishna-inspired guidance"*, not literally Krishna. Never let the model claim to be God.
2. **System prompt must include:**
   - Persona: wise, calm, compassionate, grounded in Bhagavad Gita teachings
   - Tone: gentle, reflective, modern-readable English
   - Constraint: answers should reference or echo Gita themes (duty, detachment, equanimity, devotion, inner peace)
   - Constraint: do not fabricate specific verse quotes with wrong numbers. If a verse reference is given, it must be accurate — if unsure, speak generally.
   - Safety: if the user shares distress (suicidal thoughts, abuse, severe mental health issues), gently suggest they speak to a trusted person or professional. Do not replace real help.
3. **Don't** use flowery archaic English ("thee", "thou"). The app's tone is modern and calm.
4. **Don't** make up Sanskrit. If the model doesn't know, English only.

---

## Code conventions

- **TypeScript strict mode.** No `any` unless unavoidable with a comment explaining why.
- **Functional components only.** No class components.
- **File naming:** PascalCase for components/screens (`HomeScreen.tsx`), camelCase for utils/hooks (`useRandomReel.ts`).
- **Imports:** group as (1) React/RN, (2) third-party, (3) local. Blank line between groups.
- **No inline styles** except for dynamic values. Use `StyleSheet.create` at the bottom of each file.
- **Colors** come from `constants/colors.ts`. No hex codes scattered in components.
- **No console.log** left in committed code. Use it for debugging, remove before "done".
- **Async code** uses `async/await`, not `.then()` chains.

---

## Things to NOT do

- Do **not** add user accounts, login, signup, or cloud sync in v1.
- Do **not** add analytics in v1.
- Do **not** add in-app purchases or ads.
- Do **not** generate real videos for reels. It's just components.
- Do **not** fetch gita.json over the network. Bundle it.
- Do **not** hardcode the Gemini API key. Use `.env`.
- Do **not** commit `.env`. It must be in `.gitignore`.
- Do **not** add heavy animation libraries (Lottie, etc.) unless explicitly requested.
- Do **not** rewrite the folder structure. If you think something's wrong, flag it — don't silently refactor.
- Do **not** remove or rename existing verses in `gita.json`.

---

## When in doubt

1. Check `PLAN.md` to see what phase we're in.
2. Prefer the smallest working change over the most "elegant" one.
3. If a decision is ambiguous, add a short `TODO:` comment and move on.
4. Test on an actual device/simulator before marking anything done.

---

## Useful commands

```bash
# Install deps
npm install

# Start Expo dev server
npx expo start

# Clear cache (if weird bugs)
npx expo start -c

# Type-check
npx tsc --noEmit
```
