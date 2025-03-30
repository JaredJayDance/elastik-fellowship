import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { myApiFunction } from "../functions/api-function/resource";

const schema = a.schema({
  StudentList: a
    .model({
      email: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      DOB: a.string(),
      schoolName: a.string(),
      coordinatorName: a.string(),
      teacherName: a.string(),

    }).authorization(allow => [allow.authenticated()]),

  queryStudents: a
    .query()
    .returns(a.json())
    .authorization(allow => [allow.authenticated()])
    .handler(a.handler.function(myApiFunction)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});