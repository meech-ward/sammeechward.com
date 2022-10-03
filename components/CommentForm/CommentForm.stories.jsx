// 1
import CommentForm from './index'

// 2
// The default export metadata controls how Storybook lists your stories and provides information used by addons. 
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'CommentForm',
  component: CommentForm, //  provides information used by addons.?
  argTypes: {
    selected: {
      options: ['None', 'Articles', 'Videos'],
      control: { type: 'radio' },
      defaultValue: 'None',
    },
    onSubmit: { action: 'submit' },
    onTextChange: {action: 'text change'},
  }
}

// Defining stories
// Named story exports
// With CSF, every named export in the file represents a story object by default.
// https://storybook.js.org/docs/react/api/csf
const avatar = "https://i.picsum.photos/id/556/200/200.jpg?hmac=5uOJ4fW7ElE2P5NfHlvz2zx4d99Ts2-lxy8tucygHLc"
export const Primary = (args) => (
  <CommentForm 
    {...args}
    preview={"some preview shit"}
  />
)

export const InitialText = (args) => (
  <CommentForm 
    {...args}
    initialText={"## Something to start with\n\nSome text"}
  />
)
