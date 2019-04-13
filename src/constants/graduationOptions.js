export const graduationOptions = [
  { text: "Matriculate", key: "MATRICULATE", value: "mat" },
  { text: "Intermediate", key: "INTERMEDIATE", value: "int" },
  { text: "Associate", key: "ASSOCIATE", value: "ass" },
  { text: "Graduate", key: "GRADUATE", value: "gra" },
  { text: "Postgraduate", key: "POSTGRADUATE", value: "pos" },
  { text: "Doctorate", key: "DOCTORATE", value: "doc" },
  { text: "Postdoctorate", key: "POSTDOCTORATE", value: "pdo" }
];

let list = {};
for (let index in graduationOptions) {
  list[graduationOptions[index]["value"]] = graduationOptions[index]["text"];
}
export const graduationOptionsMap = list;
