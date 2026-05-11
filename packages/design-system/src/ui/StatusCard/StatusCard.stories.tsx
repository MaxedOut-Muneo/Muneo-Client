import { StatusCard } from './StatusCard';
import OctagonCheckIcon from '../../assets/icons/OctagonCheckIcon';
import TriangleWarningIcon from '../../assets/icons/TriangleWarningIcon';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/StatusCard',
  component: StatusCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'danger', 'warning', 'info'],
    },
  },
  args: {
    label: '진단 완료한 견적',
    value: '5건',
    icon: <OctagonCheckIcon />,
    variant: 'success',
  },
} satisfies Meta<typeof StatusCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: '발견한 리스크 항목',
    value: '12건',
    icon: <TriangleWarningIcon />,
  },
};

export const Primary: Story = { args: { variant: 'primary' } };
export const Warning: Story = { args: { variant: 'warning' } };
export const Info: Story = { args: { variant: 'info' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <StatusCard variant="primary" icon={<OctagonCheckIcon />} label="Primary" value="1건" />
      <StatusCard variant="success" icon={<OctagonCheckIcon />} label="Success" value="2건" />
      <StatusCard variant="danger" icon={<TriangleWarningIcon />} label="Danger" value="3건" />
      <StatusCard variant="warning" icon={<TriangleWarningIcon />} label="Warning" value="4건" />
      <StatusCard variant="info" icon={<OctagonCheckIcon />} label="Info" value="5건" />
    </div>
  ),
};
