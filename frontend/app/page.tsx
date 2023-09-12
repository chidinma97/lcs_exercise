import React from 'react';
import MemberList from '@/components/MemberList';
import { useEffect, useMemo, useState } from 'react';
import { fetchMemberData } from '@/utils/helpers';
import Search from '@/components/Search';

import '@/styles/page.css';
import { LanguageVariant } from 'typescript';


export default async function App() {
  const memberData = await fetchMemberData();

  return (
    <main className="main-container">
      <header>
        <h1>LCS Programming Exercise</h1>
      </header>
      {/* <Search/> */}
      <MemberList members={memberData} />
    </main>
  );
}

