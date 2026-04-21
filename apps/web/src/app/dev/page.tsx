'use client';

import {
  Button,
  ChatBubble,
  ChatInput,
  DatePicker,
  Dropdown,
  SelectButton,
  Sidebar,
  type SidebarNavId,
} from '@muneo/design-system';
import { useState } from 'react';

const options = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

export default function DevPage() {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState<string>('A');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [chatInput, setChatInput] = useState('');
  const [sidebarActive, setSidebarActive] = useState<SidebarNavId>('home');

  return (
    <div style={{ minHeight: '100vh' }}>
      <Sidebar
        activeItem={sidebarActive}
        onItemClick={setSidebarActive}
        user={{ name: '김민수', email: 'minsu@email.com' }}
      />
      <div style={{ marginLeft: '224px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2>Dropdown</h2>
        <div style={{ width: '160px' }}>
          <Dropdown options={options} value={value} onChange={(v) => setValue(v)} />
        </div>
        <p>선택된 값: {value || '없음'}</p>

        <h2>Button</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" size="sm">
            Primary SM
          </Button>
          <Button variant="primary" size="md">
            Primary MD
          </Button>
          <Button variant="primary" size="lg">
            Primary LG
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="secondary" size="md">
            Secondary
          </Button>
          <Button variant="outline" size="md">
            Outline
          </Button>
          <Button variant="ghost" size="md">
            Ghost
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" size="md" disabled>
            Disabled
          </Button>
        </div>

        <h2>SelectButton</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['전체', '진행중', '완료'].map((label) => (
            <SelectButton key={label} selected={selected === label} onClick={() => setSelected(label)}>
              {label}
            </SelectButton>
          ))}
        </div>
        <p>선택된 값: {selected}</p>

        <h2>ChatBubble</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '480px' }}>
          <ChatBubble variant="ai">안녕하세요! 인테리어 AI 상담 문어입니다. 무엇을 도와드릴까요?</ChatBubble>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ChatBubble variant="user">도배 실크와 합지 차이가 뭔가요?</ChatBubble>
          </div>
        </div>

        <h2>ChatInput</h2>
        <div style={{ maxWidth: '480px' }}>
          <ChatInput value={chatInput} onChange={setChatInput} onSubmit={() => setChatInput('')} />
        </div>

        <h2>DatePicker</h2>
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          onChange={(s, e) => {
            setStartDate(s);
            setEndDate(e);
          }}
        />
        <p>
          선택된 기간:{' '}
          {startDate
            ? endDate
              ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
              : `${startDate.toLocaleDateString()} ~ 종료일 선택 중`
            : '없음'}
        </p>
      </div>
    </div>
  );
}
