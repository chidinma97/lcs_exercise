import { getMemberFirstName, getMemberLastName, getMemberParty, getMemberState, getMemberStateDistrict } from "./utils/helpers";

/**reused function to change the order of the sort to its opposite */
export const updateOrder = (order: string) => {
    return order =  (order === 'ASC') ? "DSC" : "ASC";
}
/**basic sorting functions but on different fields  matching the data in each column*/
export const sortFirstName = (order: string, members: []) => {
    console.log('order is:', order);
    if (order === 'ASC') {
        let sortedMember = [...members].sort((a, b) =>
            getMemberFirstName(a).toLowerCase() > getMemberFirstName(b).toLowerCase() ? 1 : -1);
        return sortedMember
    }
    if (order === 'DSC') {
        let sortedMember = [...members].sort((a, b) =>
            getMemberFirstName(a).toLowerCase() < getMemberFirstName(b).toLowerCase() ? 1 : -1);
        return sortedMember
    }
}
export const sortLastName = (order: string, members: []) => {
    console.log('order is:', order);
    if (order === 'ASC') {
        let sortedMember = [...members].sort((a, b) =>
            getMemberLastName(a).toLowerCase() > getMemberLastName(b).toLowerCase() ? 1 : -1);
        return sortedMember
    }
    if (order === 'DSC') {
        let sortedMember = [...members].sort((a, b) =>
        getMemberLastName(a).toLowerCase() < getMemberLastName(b).toLowerCase() ? 1 : -1);
        return sortedMember
    }
}
export const sortState= (order: string, members: []) => {
    console.log('order is:', order);
    if (order === 'ASC') {
        let sortedMember = [...members].sort((a, b) =>
            getMemberState(a).toLowerCase() > getMemberState(b).toLowerCase() ? 1 : -1);
        return sortedMember
    }
    if (order === 'DSC') {
        let sortedMember= [...members].sort((a, b) =>
        getMemberState(a).toLowerCase() < getMemberState(b).toLowerCase() ? 1 : -1);
        return sortedMember
    }
}
export const sortParty= (order: string, members: []) => {
    console.log('order is:', order);
    if (order === 'ASC') {
        let sortedMember = [...members].sort((a, b) =>
            getMemberParty(a).toLowerCase() > getMemberParty(b).toLowerCase() ? 1 : -1);
        return sortedMember
    }
    if (order === 'DSC') {
        let sortedMember= [...members].sort((a, b) =>
        getMemberParty(a).toLowerCase() < getMemberParty(b).toLowerCase() ? 1 : -1);
        return sortedMember
    }
}
export const sortStateDistrict= (order: string, members: []) => {
    console.log('order is:', order);
    if (order === 'ASC') {
        let sortedMember = [...members].sort((a, b) =>
            getMemberStateDistrict(a).toLowerCase() > getMemberStateDistrict(b).toLowerCase() ? 1 : -1);
        return sortedMember
    }
    if (order === 'DSC') {
        let sortedMember= [...members].sort((a, b) =>
        getMemberStateDistrict(a).toLowerCase() < getMemberStateDistrict(b).toLowerCase() ? 1 : -1);
        return sortedMember
    }
}