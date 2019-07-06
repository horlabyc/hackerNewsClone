export interface News {
  id: number;
  title: string;
  url: string;
  shortUrl: string;
  author: string;
  timeISO: string;
  commentCount: string;
  points: string;
}

export interface Query {
  allCourses: News[];
}
