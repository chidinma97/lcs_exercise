'use client';
import { getMembers, getMemberName, getMemberFirstName, getMemberLastName, getMemberState, getMemberParty, getMemberStateDistrict } from '@/utils/helpers';
import { SetStateAction, useEffect, useState } from 'react';
import '@/styles/MemberList.css';
import Search from './Search';
import { sortFirstName, sortLastName, sortParty, sortState, sortStateDistrict, updateOrder } from '@/sortHelpers';

interface IProps {
  members: Record<string, any>;
}

export default function MemberList({ ...props }: IProps) {
  const memberData = getMembers(props.members); //getting the array of members
  const [members, setMembers] = useState(memberData); // used to control current state of member. Initalized to empty array. can be set to memberData if we want to see original list of members
  const [memberSearchValue, setMemberSearchState] = useState(""); //save the search value when pressed enter
  const [memberPartyValue, setPartyFilter] = useState("");
  const [memberStateValue, setStateFilter] = useState("");
  const [order, setOrder] = useState("ASC");
/**
 * In order to clean up code and prevent duplicates as much as possible I created these wrapper functions
 * These functions are used for the onClicks or the column headers
 * I could've created a separate order var for each function, but since it would only go between two states
 * I decided to use the same order var for each function and user might have to do an extra click to get the sorting 
 * they want.
 */
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
  const sortByParty = (order: string) => {
    setMembers(sortParty(order, members));
    setOrder(updateOrder(order));
  }
  const sortByStateDistrict = (order: string) => {
    setMembers(sortStateDistrict(order, members));
    setOrder(updateOrder(order));
  }

/**
 * I am using Promises that when table is updated it is async with other filters.
 */
  let filterName = function (memberSearchValue: string) {
    return new Promise((resolve) => {
      if (memberSearchValue === '') {
        resolve(memberData);
        return;
      }
      let filteredMembersName = members?.filter(member =>
        member?.["member-info"]?.["official-name"]?.toLowerCase().includes(memberSearchValue.toLowerCase())
      );
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
    filterName(memberSearchValue).then((members) => {
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
      {/*I am using callbacks because I wanted save the search string i am using to filter from the search component when I submit, 
      so then I can use it in the useEffect.
       */}
      <>
        Search Name: <Search callback={(memberSearchValue: SetStateAction<string>) => setMemberSearchState(memberSearchValue)}></Search>
        Search Party: <Search callback={(memberPartyValue: SetStateAction<string>) => setPartyFilter(memberPartyValue)} />
        Search State: <Search callback={(memberStateValue: SetStateAction<string>) => setStateFilter(memberStateValue)} />
      </>
      <table>
        <thead>
          <tr>
            {/* # TODO 
            add visual to show direction of sort
            */} 
            <th onClick={() => sortByFirstName(order)}>First Name</th>
            <th onClick={() => sortByLastName(order)}>Last Name</th>
            <th onClick={() => sortByState(order)}>State</th>
            <th onClick={() => sortByParty(order)}>Party</th>
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