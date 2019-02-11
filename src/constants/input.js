import BooleanField from "./../components/input_fields/boolean-field";
import ChoiceField from "./../components/input_fields/choice-field";
import DateField from "./../components/input_fields/date-field";
import TextField from "./../components/input_fields/text-field";
import TextAreaField from "./../components/input_fields/textarea-field";
import YearField from "./../components/input_fields/year-field";
import FileField from "./../components/input_fields/file-field";
import ImageField from "./../components/input_fields/image-field";

const graduationOptions = [
  { text: "MATRICULATE", key: "MATRICULATE", value: "mat" },
  { text: "INTERMEDIATE", key: "INTERMEDIATE", value: "int" },
  { text: "ASSOCIATE", key: "ASSOCIATE", value: "ass" },
  { text: "GRADUATE", key: "GRADUATE", value: "gra" },
  { text: "POSTGRADUATE", key: "POSTGRADUATE", value: "pos" },
  { text: "DOCTORATE", key: "DOCTORATE", value: "doc" },
  { text: "POSTDOCTORATE", key: "POSTDOCTORATE", value: "pdo" }
];

export const FieldMap = {
  boolean_field: BooleanField,
  choice_field: ChoiceField,
  date_field: DateField,
  input_field: TextField,
  text_area_field: TextAreaField,
  year_field: YearField,
  file_field: FileField,
  choice_field: ChoiceField,
  image_field: ImageField
};
