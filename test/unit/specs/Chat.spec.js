import Vue from 'vue'
import ChatBox from '@/components/ChatBox'

describe('ChatBox.vue', () => {
  it('should contain empty string', () => {
    const Constructor = Vue.extend(ChatBox)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.chatname').textContent)
      .toEqual('')
  })
})
