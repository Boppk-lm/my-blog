import { createPinia } from 'pinia'
import { useCounterStore } from './useCounterStore'
const pinia = createPinia()
export default {pinia,useCounterStore}