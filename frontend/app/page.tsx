import React from 'react';
import MemberList from '@/components/MemberList';
import { fetchMemberData } from '@/utils/helpers';
import { useEffect, useState } from 'react';

import '@/styles/page.css';
import { LanguageVariant } from 'typescript';

export default async function App() {
  const memberData = await fetchMemberData();
  // const [data, setData] = useState(memberData);

  return (
    <main className="main-container">
      <header>
        <h1>LCS Programming Exercise</h1>
      </header>
      <label>Search</label>
      <input type='text' />
      <MemberList members={memberData} />
    </main>
  );
}

