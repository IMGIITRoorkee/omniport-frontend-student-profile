export const graduationOptions = [
  { text: "Matriculate (Class X)", key: "MATRICULATE", value: "mat" },
  { text: "Intermediate (Class XII)", key: "INTERMEDIATE", value: "int" },
  { text: "Associate", key: "ASSOCIATE", value: "ass" },
  { text: "Graduate (UG)", key: "GRADUATE", value: "gra" },
  { text: "Postgraduate (PG)", key: "POSTGRADUATE", value: "pos" },
  { text: "Doctorate (PhD)", key: "DOCTORATE", value: "doc" },
  { text: "Postdoctorate (Postdoc)", key: "POSTDOCTORATE", value: "pdo" }
];

let list = {};
for (let index in graduationOptions) {
  list[graduationOptions[index]["value"]] = graduationOptions[index]["text"];
}
export const graduationOptionsMap = list;
