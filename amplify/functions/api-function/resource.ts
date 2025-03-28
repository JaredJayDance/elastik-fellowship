import { defineFunction } from "@aws-amplify/backend";

export const myApiFunction = defineFunction({
  name: "myApiFunction",
});

console.log("my function is loaded.");