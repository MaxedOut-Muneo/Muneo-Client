import { Text } from './Text';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['display', 'h1', 'h2', 'h3', 'body1', 'body2', 'label', 'labelSm', 'caption'],
    },
  },
  args: {
    children: '문어 디자인 시스템 텍스트',
    variant: 'body1',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body1: Story = {};

export const Display: Story = { args: { variant: 'display' } };

export const H1: Story = { args: { variant: 'h1' } };
export const H2: Story = { args: { variant: 'h2' } };
export const H3: Story = { args: { variant: 'h3' } };

export const Body2: Story = { args: { variant: 'body2' } };
export const Label: Story = { args: { variant: 'label' } };
export const LabelSm: Story = { args: { variant: 'labelSm' } };
export const Caption: Story = { args: { variant: 'caption' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text variant="display">Display</Text>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="body1">Body 1 본문 텍스트</Text>
      <Text variant="body2">Body 2 본문 텍스트</Text>
      <Text variant="label">Label</Text>
      <Text variant="labelSm">Label small</Text>
      <Text variant="caption">Caption</Text>
    </div>
  ),
};
