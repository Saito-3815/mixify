import { TuneFooter } from "./TuneFooter";

export default {
  title: "TuneFooter",
  component: TuneFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <TuneFooter {...args} />;

export const WithProps = Template.bind({});
WithProps.args = {
  tune: {
    name: "Test Tune Name has long text virsion, this is a test text for long text.Long text is here.",
    artist: "Test Artist",
    album: "Test Album",
    images: {
      small: "https://picsum.photos/200", // 200x200のランダムな画像
      large: "https://picsum.photos/500", // 500x500のランダムな画像
    },
    time: "3:33",
  },
};
