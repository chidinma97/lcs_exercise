import { getMembers, getMemberName, getMemberFirstName, getMemberLastName, getMemberState, getMemberParty } from '@/utils/helpers';

import '@/styles/MemberList.css';

interface IProps {
  members: Record<string, any>;
}

export default function MemberList({ ...props}: IProps) {
  return (
    // <ol className="member-list">
    //   {getMembers(props.members).map((member: any) =>
    //     <li key={member.statedistrict}>
    //       {getMemberFirstName(member)}
    //     </li>
    //   )}
    // </ol>
      
    <table>
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