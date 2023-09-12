'use client';
import { getMembers, getMemberName, getMemberFirstName, getMemberLastName, getMemberState, getMemberParty, getMemberStateDistrict } from '@/utils/helpers';
import { SetStateAction, useEffect, useState } from 'react';
import '@/styles/MemberList.css';
import Search from './Search';
import ColumnHead from './ColumnHead';

interface IProps {
  members: Record<string, any>;
}

export default function MemberList({ ...props }: IProps) {
  const memberData = getMembers(props.members);
  const [members, setMembers] = useState([]);
  const [memberSearchValue, setMemberSearchState] = useState("");

  let filterMembers = function (memberSearchValue: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (memberSearchValue === '') {
          resolve(memberData);
          return;
        }
        let filteredMembers = memberData?.filter(member =>
          member?.["member-info"]?.["official-name"]?.toLowerCase().includes(memberSearchValue.toLocaleLowerCase())
        );
        resolve(filteredMembers);
      }, 0)
    })
  }

  useEffect(() => {
    setMembers([]);
    filterMembers(memberSearchValue).then((members) => {
      setMembers(members);
    });
  }, [memberSearchValue])

  return (
    <div>
      <Search callback={(memberSearchValue: SetStateAction<string>) => setMemberSearchState(memberSearchValue)} />
      <table>
        <ColumnHead />
        <tbody>
          {members.map((member: any) =>
            <tr>
              <td key={member.firstname}>
                {getMemberFirstName(member)}
              </td>
              <td key={member.lastname}>
                {getMemberLastName(member)}
              </td>
              <td key={member.memberState}>
                {getMemberState(member)}
              </td>
              <td key={member.memberParty}>
                {getMemberParty(member)}
              </td>
              <td key={member.memberStateDistrict}>
                {getMemberStateDistrict(member)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}