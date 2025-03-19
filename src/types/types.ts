export interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: Department; // ✅ Reused Department interface
}

export interface Department {
  id: number;
  name: string;
}

export interface Priority {
  id: number;
  name: string;
  icon: string;
}

export interface Status {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments?: Comment[];
}

export interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: Department;
  employee: Employee;
  status: Status;
  priority: Priority;
  total_comments: number;
}
