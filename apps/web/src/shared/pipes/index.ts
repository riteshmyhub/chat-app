function slugPipe(string: string) {
    return string
       .toString()
       .trim()
       .toLowerCase()
       .replace(/\s+/g, "-")
       .replace(/[^\w\-]+/g, "")
       .replace(/\-\-+/g, "-")
       .replace(/^-+/, "")
       .replace(/-+$/, "");
 }
 
 function truncate(string: string, limit: number) {
    return string?.length > limit ? string.substr(0, limit) + "..." : string;
 }
 
 function mongoose2Date(date: string | number | Date | undefined) {
    return date ? new Date(date).toISOString().split("T")[0] : "";
 }
 
 function date2enGB(date: string | number | Date | undefined) {
    if (!date) {
       return "";
    }
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-GB", options);
 }
 
 function templateVariables(variables: { name: string; value: string }[], template: string) {
    if (variables?.length && template) {
       variables.forEach((variable) => {
          template = template.replace(new RegExp(`{{${variable.name}}}`, "g"), variable?.value);
       });
       return template;
    } else {
       return template;
    }
 }
 
 async function getBase64(file: File): Promise<string> {
    try {
       const reader = new FileReader();
       const base64 = await new Promise<string>((resolve, reject) => {
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
       });
       return base64;
    } catch (error) {
       console.error("Error converting file to base64", error);
       throw error; // Rethrow the error to be handled by the caller
    }
 }
 export { slugPipe, truncate, mongoose2Date, date2enGB, templateVariables, getBase64 };