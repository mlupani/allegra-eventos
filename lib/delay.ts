export function delay (ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function fireAndForget (promise: Promise<unknown>) {
  promise.catch(() => undefined)
}
