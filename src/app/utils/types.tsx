export type FetchTask = {
  _id: string;
  message: string;
  isChecked: boolean;
  __v: number;
};
export type FetchTasks = {
  tasks: FetchTask[];
};
