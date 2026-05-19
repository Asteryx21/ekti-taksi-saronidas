# Saronida School Quiz Game — Vue 3 Project Plan

## Overview

A colorful Vue 3 mini-game for children where students from two school classes answer quiz questions.

The game is frontend-only with no backend.

Players:

* Enter a username
* Choose one of 40 students
* Answer 2–3 questions related to that student
* Earn points
* Compete on a leaderboard

The game should feel:

* Cartoonish
* Funny
* Bright and friendly
* Easy to use for kids
* Mobile-friendly

---

# Tech Stack

## Framework

* Vue 3
* Vue Router
* Vite
* Composition API

## State Management

You do NOT need Pinia for this project.

A simple combination of:

* composables
* reactive state
* localStorage

is enough.

---

# Suggested Folder Structure

```txt
src/
 ├── assets/
 │    ├── sounds/
 │    ├── images/
 │    └── fonts/
 │
 ├── components/
 │    ├── StudentCard.vue
 │    ├── QuestionCard.vue
 │    ├── LeaderboardTable.vue
 │    ├── ProgressBar.vue
 │    ├── CartoonButton.vue
 │    └── UsernameModal.vue
 │
 ├── composables/
 │    ├── useGameState.js
 │    ├── useLeaderboard.js
 │    └── useAudio.js
 │
 ├── data/
 │    ├── classes.json
 │    ├── students.json
 │    └── questions.json
 │
 ├── pages/
 │    ├── HomePage.vue
 │    ├── StudentSelectPage.vue
 │    ├── QuizPage.vue
 │    ├── ResultPage.vue
 │    └── LeaderboardPage.vue
 │
 ├── router/
 │    └── index.js
 │
 ├── styles/
 │    ├── variables.css
 │    ├── animations.css
 │    └── global.css
 │
 ├── App.vue
 └── main.js
```

---

# Game Flow

## 1. Username Screen

When the app opens:

Player enters:

* nickname / username

Store username in:

* localStorage

Example:

```js
localStorage.setItem('quiz_username', username)
```

---

## 2. Choose Class

Display:

* Class A
* Class B

Each class contains:

* 20 students

Could visually appear as:

* classroom cards
* cartoon school doors
* colorful boards

---

## 3. Choose Student

Display all students in selected class.

Each student card can contain:

* avatar/icon
* name
* completed badge
* stars

Example:

```json
{
  "id": 1,
  "name": "Maria",
  "class": "A",
  "avatar": "girl1.png"
}
```

---

## 4. Quiz Round

Each student has:

* 2–3 questions

Question types:

* multiple choice
* true/false
* image choice

Example:

```json
{
  "studentId": 1,
  "questions": [
    {
      "id": 1,
      "question": "What color is the sun?",
      "options": ["Blue", "Yellow", "Green"],
      "answer": "Yellow"
    }
  ]
}
```

---

## 5. Score System

Example scoring:

* Correct answer = 10 points
* Wrong answer = 0 points
* Bonus for all correct = +10

At the end:

```txt
Maria completed!
You earned 30 points ⭐
```

---

## 6. Leaderboard

Store scores in localStorage.

Example structure:

```js
[
  {
    username: 'Alex',
    score: 120
  }
]
```

Sort descending:

```js
scores.sort((a, b) => b.score - a.score)
```

Leaderboard can show:

* Rank
* Username
* Total Score
* Stars
* Completed Students

---

# Data Storage

## Recommended

Use:

* JSON files for questions/students
* localStorage for:

  * username
  * scores
  * progress
  * completed quizzes

Example:

```js
localStorage.setItem('completed_students', JSON.stringify(ids))
```

---

# Visual Style

## Your Palette

```txt
Pink:      #f1aed8
Gold:      #eba909
Purple:    #ce6ac7
Yellow:    #dbdb3b
Cyan:      #c2f9f8
```

---

# Suggested Theme Usage

## Backgrounds

* Cyan (#c2f9f8)
* Soft gradients

## Buttons

* Gold (#eba909)
* Purple (#ce6ac7)

## Cards

* White with thick cartoon borders

## Hover Effects

* Bounce animations
* Wiggle effects

---

# Typography

## Recommended Fonts

### Main Font

* Fredoka
* Baloo 2
* Luckiest Guy

Use Google Fonts.

Example:

```css
font-family: 'Fredoka', sans-serif;
```

---

# Sound Design

## Add Fun Sounds

Use small sound effects:

### Correct Answer

* sparkle
* ding

### Wrong Answer

* cartoon boing

### Buttons

* pop sounds

### Celebration

* confetti + cheering

Recommended format:

* mp3
* wav

---

# Animation Ideas

## Student Cards

* float animation
* bounce on hover

## Correct Answer

* green flash
* stars animation

## Wrong Answer

* shake animation

## Leaderboard

* animated trophies

---

# Routes

```txt
/                  -> Home
/select-class      -> Class selection
/students/:classId -> Students
/quiz/:studentId   -> Quiz
/result             -> Results
/leaderboard        -> Leaderboard
```

---

# Suggested UI Components

## StudentCard.vue

Props:

* student
* completed

Features:

* hover animation
* avatar
* stars

---

## QuestionCard.vue

Features:

* large buttons
* colorful options
* sound effects
* progress display

---

## LeaderboardTable.vue

Features:

* trophy icons
* gold/silver/bronze colors
* animated rows

---

# Suggested Extra Features

## Achievements

Examples:

* First Quiz
* Perfect Score
* Quiz Master

---

## Stickers / Rewards

Kids unlock:

* stars
* medals
* funny stickers

---

## Avatar Selection

Before starting:

* choose a cartoon avatar

---

# Example LocalStorage Structure

```js
{
  username: 'Alex',
  totalScore: 120,
  completedStudents: [1, 4, 9],
  achievements: ['first_quiz']
}
```

---

# Recommended First Steps

## 1. Create Vue App

```bash
yarn create vue .
```

Options:

* TypeScript: No
* Router: Yes
* Pinia: No
* ESLint: No
* Prettier: No

---

## 2. Install Helpful Packages

```bash
yarn add animate.css
```

Optional:

```bash
yarn add vue-confetti
```

---

## 3. Add Fonts

In `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600&display=swap" rel="stylesheet">
```

---

# Recommended MVP

Start with:

1. Username screen
2. Student selection
3. 2-question quiz
4. Score system
5. Leaderboard
6. localStorage save

Then add:

* sounds
* animations
* achievements
* avatars
* confetti

---

# Best Approach

Keep everything simple.

Because this project is frontend-only:

* localStorage is enough
* no database needed
* no backend needed
* no authentication needed

Vue 3 + Router + JSON files is the ideal setup.
