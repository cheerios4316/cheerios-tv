export interface IFormField {
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}