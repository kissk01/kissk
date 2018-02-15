import Vue from 'vue'
import Settings from '@/components/Settings'

describe('Settings.vue', () => {
  it('should contain empty string', () => {
    const Constructor = Vue.extend(Settings)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.nickname').textContent)
      .toEqual('')
  })
})
