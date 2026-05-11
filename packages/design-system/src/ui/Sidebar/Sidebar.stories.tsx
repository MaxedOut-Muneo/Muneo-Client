import { useState } from 'react';
import { Sidebar, type SidebarNavId } from './Sidebar';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState<SidebarNavId>('home');
    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Sidebar activeItem={active} onItemClick={setActive} user={{ name: '이경준', email: 'kyungjun@muneo.com' }} />
      </div>
    );
  },
};

export const WithoutUser: Story = {
  render: () => {
    const [active, setActive] = useState<SidebarNavId>('estimate');
    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Sidebar activeItem={active} onItemClick={setActive} />
      </div>
    );
  },
};

export const HistoryActive: Story = {
  render: () => (
    <div style={{ height: '100vh', display: 'flex' }}>
      <Sidebar activeItem="history" user={{ name: '홍길동', email: 'gildong@example.com' }} />
    </div>
  ),
};
