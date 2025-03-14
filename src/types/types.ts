export interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: {
    id: number;
    name: string;
  };
}

export interface Department {
  id: number;
  name: string;
}
