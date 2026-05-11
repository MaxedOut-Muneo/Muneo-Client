import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'outlineSecondary'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {
    children: '버튼',
    variant: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Outline: Story = { args: { variant: 'outline' } };

export const OutlineSecondary: Story = { args: { variant: 'outlineSecondary' } };

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const AsLink: Story = {
  args: { as: 'a', href: '#', children: '링크 버튼' },
};
