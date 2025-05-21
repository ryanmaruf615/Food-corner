import { FieldValues } from "react-hook-form";

export function filterEmptyFields(obj: FieldValues) {
  const filteredObj: FieldValues = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (typeof value === "object" && value !== null) {
      // Recursively filter nested objects
      const nestedObject = filterEmptyFields(value);
      if (Object.keys(nestedObject).length > 0) {
        filteredObj[key] = nestedObject;
      }
    } else if (value !== "" && value !== null && value !== undefined) {
      filteredObj[key] = value;
    }
  });

  return filteredObj;
}
