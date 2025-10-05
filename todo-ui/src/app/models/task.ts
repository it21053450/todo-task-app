export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

export interface CreateTask {
  title: string;
  description: string;
}