export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Url = {
  id: string;
  originalUrl: string;
  shortenedUrl: string;
  user: {
    name: string;
  };
};
