import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../counter'

describe('counter store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('incrementa e calcula o dobro', () => {
    const store = useCounterStore()
    expect(store.count).toBe(0)
    store.increment()
    expect(store.count).toBe(1)
    expect(store.doubleCount).toBe(2)
  })

  it('zera o contador', () => {
    const store = useCounterStore()
    store.increment()
    store.reset()
    expect(store.count).toBe(0)
  })
})
