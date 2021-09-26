import { useState } from "react";

export default (
  defaultValue: string
): { value: string; onChange: React.ChangeEventHandler<HTMLInputElement> } => {
  const [value, setValue] = useState<string>(defaultValue);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  return { value, onChange };
};
