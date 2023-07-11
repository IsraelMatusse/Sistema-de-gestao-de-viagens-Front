export function calculateAge(birthday: any) {
    const ageDifMs: any = Date.now() - birthday;
    const ageDate: any = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}