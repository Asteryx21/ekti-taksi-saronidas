import correctSound from '../assets/sounds/correct.mp3'
import wrongSound from '../assets/sounds/wrong.mp3'
import completeSound from '../assets/sounds/complete.mp3'


const sounds = { 
  correct: new Audio(correctSound),
  wrong: new Audio(wrongSound),
  complete: new Audio(completeSound),
}
export function useAudio() {
  const playSound = (soundName) => {
    // Placeholder for sound effects
    // Will be implemented with actual audio files later
    console.log(`Playing sound: ${soundName}`)

    const sound = sounds[soundName]
    if (!sound) return
    sound.currentTime = 0
    sound.play()
  }

  const playCorrect = () => {
    playSound('correct')
  }

  const playWrong = () => {
    playSound('wrong')
  }

  const playClick = () => {
    playSound('click')
  }

  const playComplete = () => {
    playSound('complete')
  }

  return {
    playSound,
    playCorrect,
    playWrong,
    playClick,
    playComplete,
  }
}
