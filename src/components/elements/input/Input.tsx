import { ChangeEventHandler } from "react";
import styles from "./Input.module.scss";

const InputComponent = ({
  value,
  label,
  placeholder,
  type,
  id,
  autoComplete,
  onChange,
}: {
  value?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  id?: string;
  autoComplete?: string;
  onChange?: ChangeEventHandler | undefined;
}) => {
  return (
    <div className={styles.input_component}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        name={id}
        placeholder={placeholder}
        id={id}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default InputComponent;
