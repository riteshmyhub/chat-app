export function duplicateFinder(list: any[], key?: string) {
   const duplicateList: any[] = [];
   const isDuplicateMember = list?.some((element) => {
      if (duplicateList?.includes(element)) {
         return true;
      }
      duplicateList.push(element);
      return false;
   });
   return isDuplicateMember;
}
