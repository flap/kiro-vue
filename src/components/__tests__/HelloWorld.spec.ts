import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renderiza a mensagem recebida via prop', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })

  it('usa o userName padrão quando não informado', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'oi' } })
    expect(wrapper.text()).toContain('visitante')
  })

  it('escapa conteúdo do usuário (sem injeção de HTML)', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'oi', userName: '<img src=x onerror=alert(1)>' },
    })
    // O texto aparece literal; nenhuma tag <img> é criada no DOM.
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.html()).toContain('&lt;img')
  })
})
