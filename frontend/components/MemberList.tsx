import { getMembers, getMemberName, getMemberFirstName, getMemberLastName, getMemberState, getMemberParty } from '@/utils/helpers';
// import TableHead from "./TableHead";
import { useEffect, useState } from 'react';
import '@/styles/MemberList.css';

interface IProps {
  members: Record<string, any>;
}

export default function MemberList({ ...props }: IProps) {
  // const [prop, setTableData] = useState(prop);

  const columns = [
    { label: "First Name", accessor: "first_name", sortable: true },
    { label: "Last Name", accessor: "last_name", sortable: false },
    { label: "State", accessor: "state", sortable: true },
    { label: "Party", accessor: "party", sortable: true },
  ];

  const members= getMembers(props.members);
  // const data3 = [...members].sort((a, b) => a.name.localeCompare(b.name));

  // const handleSortingChange = (accessor) => {
  //   const sortOrder =
  //    accessor === sortField && order === "asc" ? "desc" : "asc";
  //   setSortField(accessor);
  //   setOrder(sortOrder);
  //   handleSorting(accessor, sortOrder);
  //  };

  return (
    // <ol className="member-list">
    //   {getMembers(props.members).map((member: any) =>
    //     <li key={member.statedistrict}>
    //       {getMemberFirstName(member)}
    //     </li>
    //   )}
    // </ol>

    <table>

      <thead>
        <tr>
          {columns.map(({ label, accessor, sortable }) => {
            return (
              <th
                key={accessor}>
                {/* // onClick={sortable ? () => handleSortingChange(accessor) : null} > */}
                {label}
              </th>
            );
          })}
        </tr>
      </thead>

      {getMembers(props.members).map((member: any) =>
        <tr>
          <td key={member.firstname}>
            {getMemberFirstName(member)}
          </td>
          <td key={member.lastname}>
            {getMemberLastName(member)}
          </td>
          <td key={member.getMemberState}>
            {getMemberState(member)}
          </td>
          <td key={member.getMemberState}>
            {getMemberParty(member)}
          </td>
        </tr>


      )}
    </table>
  )
}