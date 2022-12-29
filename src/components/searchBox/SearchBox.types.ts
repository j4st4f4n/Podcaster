export type SearchBoxProps = {
  resultsNumber: number;
  value: string;
  onSearchChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
};
