import { useState } from "react";
import React from 'react';

const ColumnHead = () => {
    const columns = [
        { label: "First Name", accessor: "firstname", sortable: true },
        { label: "Last Name", accessor: "lastname", sortable: true },
        { label: "State", accessor: "state", sortable: true },
        { label: "Party", accessor: "party", sortable: false },
        { label: "StateDistrict", accessor: "statedistrict", sortable: true },
    ];

    return(
        <div>
            <thead>
          <tr>
            {columns.map(({ label, accessor, sortable }) => {
              return (
                <th
                  key={accessor}>
                  {label}
                </th>
              );
            })}
          </tr>
        </thead>
        </div>
    )
}


export default ColumnHead;