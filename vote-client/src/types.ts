export type Poll = {
  id: number;
  title: string;
  votes: Vote[];
};

export type Vote = {
  id: number;
  poll_id: number;
  option: string;
};
