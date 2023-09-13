'use client';
import { getMembers, getMemberName, getMemberFirstName, getMemberLastName, getMemberState, getMemberParty, getMemberStateDistrict } from '@/utils/helpers';
import { SetStateAction, useEffect, useState } from 'react';
import '@/styles/MemberList.css';
import Search from './Search';
import { sortFirstName, sortLastName, sortState, sortStateDistrict, updateOrder } from '@/sortHelpers';

interface IProps {
  members: Record<string, any>;
}

export default function MemberList({ ...props }: IProps) {
  const memberData = getMembers(props.members); //getting the array of members
  const [members, setMembers] = useState<any[]>(memberData); // used to control current state of member. Initalized to empty array. can be set to memberData if we want to see original list of members
  const [memberSearchValue, setMemberSearchState] = useState(""); //save the search value when pressed enter
  const [memberPartyValue, setPartyFilter] = useState("");
  const [memberStateValue, setStateFilter] = useState("");
  const [order, setOrder] = useState<any>("ASC");

  const sortByFirstName = (order: string) => {
    setMembers(sortFirstName(order, members));
    setOrder(updateOrder(order));
  }

  const sortByLastName = (order: string) => {
    setMembers(sortLastName(order, members));
    setOrder(updateOrder(order));
  }

  const sortByState = (order: string) => {
    setMembers(sortState(order, members));
    setOrder(updateOrder(order));
  }

  const sortByStateDistrict = (order: string) => {
    setMembers(sortStateDistrict(order, members));
    setOrder(updateOrder(order));
  }

  let filterMembers = function (memberSearchValue: string) {
    return new Promise((resolve) => {
      if (memberSearchValue === '') {
        resolve(memberData);
        return;
      }
      let filteredMembersName = members?.filter(member =>
        member?.["member-info"]?.["official-name"]?.toLowerCase().includes(memberSearchValue.toLowerCase())
      ); //filter through official-name value because it contains both first and last
      resolve(filteredMembersName);
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

  let filterState = function (memberStateValue: string) {
    return new Promise((resolve) => {
      if (memberStateValue === '') {
        resolve(memberData);
        return;
      }
      let filteredMembersState = members.filter(member =>
        member?.['member-info']?.['state']?.['state-fullname']?.toLowerCase().includes(memberStateValue)
      );
      resolve(filteredMembersState);
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

  useEffect(() => {
    setMembers([]);
    filterState(memberStateValue).then((members) => {
      setMembers(members);
    });
  }, [memberStateValue])

  return (
    <div>
      <>
        Search Name: <Search callback={(memberSearchValue: SetStateAction<string>) => setMemberSearchState(memberSearchValue)} />
        Search Party: <Search callback={(memberPartyValue: SetStateAction<string>) => setPartyFilter(memberPartyValue)} />
        Search State: <Search callback={(memberStateValue: SetStateAction<string>) => setStateFilter(memberStateValue)} />
      </>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortByFirstName(order)}>First Name</th>
            <th onClick={() => sortByLastName(order)}>Last Name</th>
            <th onClick={() => sortByState(order)}>State</th>
            <th>Party</th>
            <th onClick={() => sortByStateDistrict(order)}>State District</th>
          </tr>
        </thead>
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