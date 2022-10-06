// 1
import InteractiveParallelism from './index'

// 2
// The default export metadata controls how Storybook lists your stories and provides information used by addons. 
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'InteractiveParallelism',
  component: InteractiveParallelism, //  provides information used by addons.?
}


export const Serial_no_write = () =>  <InteractiveParallelism component="serial_no_write" />
export const Concurrent_no_write = () =>  <InteractiveParallelism component="concurrent_no_write" />
export const Concurrent = () =>  <InteractiveParallelism component="concurrent" />
export const Serial = () =>  <InteractiveParallelism component="serial" />
export const Locked = () =>  <InteractiveParallelism component="locked" />
export const Multiversion = () =>  <InteractiveParallelism component="multiversion" />
export const Multiversion_multi_write = () =>  <InteractiveParallelism component="multiversion_multi_write" />