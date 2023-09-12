'use client';
import { getMembers, getMemberName, getMemberFirstName, getMemberLastName, getMemberState, getMemberParty, getMemberStateDistrict } from '@/utils/helpers';
import { SetStateAction, useEffect, useState } from 'react';
import '@/styles/MemberList.css';
import ColumnHead from './ColumnHead';
import Search from './Search';

interface IProps {
  members: Record<string, any>;
}

export default function MemberList({ ...props }: IProps) {
  const memberData = getMembers(props.members); //getting the array of members
  const [members, setMembers] = useState(memberData); // used to control current state of member. Initalized to empty array. can be set to memberData if we want to see original list of members
  const [memberSearchValue, setMemberSearchState] = useState(""); //save the search value when pressed enter
  const [memberPartyValue, setPartyFilterState] = useState("");

  let filterMembers = function (memberSearchValue: string) {
    return new Promise((resolve) => {
        if (memberSearchValue === '') {
          resolve(memberData);
          return;
        }
        let filteredMembers = members?.filter(member =>
          member?.["member-info"]?.["official-name"]?.toLowerCase().includes(memberSearchValue.toLowerCase())
        ); //filter through official-name value because it contains both first and last
        resolve(filteredMembers);
    })
  }

  let filterParty = function (memberPartyValue: string) {
    return new Promise((resolve) => {
        if (memberPartyValue === '') {
          resolve(memberData);
          return;
        }
        let filteredMembersParty = members.filter(member =>
          member?.['member-info']?.["party"]?.toLowerCase().includes(memberPartyValue)
        );
        resolve(filteredMembersParty);
    })
  }

  useEffect(() => {
    setMembers([]);
    filterMembers(memberSearchValue).then((members) => {
      setMembers(members);
    });
  }, [memberSearchValue])

  useEffect(() => {
    setMembers([]);
    filterParty(memberPartyValue).then((members) => {
      setMembers(members);
    });
  }, [memberPartyValue])

  return (
    <div>
      <>
      Search Name: <Search callback={(memberSearchValue: SetStateAction<string>) => setMemberSearchState(memberSearchValue)} />
      Search Party: <Search callback={(memberPartyValue: SetStateAction<string>) => setPartyFilterState(memberPartyValue)}/>
      </>
      <table>
        <thead><ColumnHead /></thead>
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