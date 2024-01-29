export const starter = (input: string) => {
  const lines = input.split('\n').filter((x) => !!x)
  return `Ready, solve that puzzle! Input: ${lines}`
}
