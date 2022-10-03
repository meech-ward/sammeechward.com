// 1
import LoginForm from './index'

// 2
// The default export metadata controls how Storybook lists your stories and provides information used by addons. 
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'LoginForm',
  component: LoginForm, //  provides information used by addons.?
}

// Defining stories
// Named story exports
// With CSF, every named export in the file represents a story object by default.
// https://storybook.js.org/docs/react/api/csf
const avatar = "https://i.picsum.photos/id/556/200/200.jpg?hmac=5uOJ4fW7ElE2P5NfHlvz2zx4d99Ts2-lxy8tucygHLc"
export const Primary = () => (
  <LoginForm 
    avatar={avatar} 
    username="saM" 
    text="some comment text" 
  />
)
