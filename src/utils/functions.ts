export function capitalize(sentence: string): string {
  const words = sentence.split(' ')
  const capitalized = words.map((word) => {
    const firstLetter = word[0].toUpperCase()
    const otherLetters = word.substring(1).toLocaleLowerCase()

    return firstLetter + otherLetters
  })

  return capitalized.toString().replaceAll(',', ' ')
}
