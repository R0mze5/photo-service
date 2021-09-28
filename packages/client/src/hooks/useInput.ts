import { useState } from "react";

export default (
  defaultValue: string
): {
  value: string;
  setValue: (value: string) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} => {
  const [value, setValue] = useState<string>(defaultValue);

  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setValue(event.target.value);
  };

  return { value, onChange, setValue };
};
