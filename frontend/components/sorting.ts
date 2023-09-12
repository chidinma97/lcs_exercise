// const [sortConfig, setSortConfig] = useState('');
  // let sortedMembers = [...members];
  // if (sortConfig !== null) {
  //   sortedMembers.sort((a, b) => {
  //     if (a.statedistrict < b.statedistrict) {
  //       return -1;
  //     }
  //     if (a.statedistrict > b.statedistrict) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  // }
  // const sortMembers = useMemo(()=>{
  //   let sortedMembers = [...members];
  //   if (sortConfig !== null) {
  //     sortedMembers.sort((a, b) => {
  //       if (a[sortConfig.key] < b[sortConfig.key]) {
  //         return sortConfig.direction === 'ascending' ? -1 : 1;
  //       }
  //       if (a[sortConfig.key] > b[sortConfig.key]) {
  //         return sortConfig.direction === 'ascending' ? 1 : -1;
  //       }
  //       return 0;
  //     });
  //   }
  //   return sortedMembers;
  // }, [members, sortConfig]);
  
  // const requestSort = (key) => {
  //   let direction = 'ascending';
  //   if (sortConfig.key === key && sortConfig.direction === 'ascending') {
  //     direction = 'descending';
  //   }
  //   setSortConfig({key, direction });
  // }