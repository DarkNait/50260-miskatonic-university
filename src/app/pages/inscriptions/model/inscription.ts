import { Course } from "../../courses/model/course";
import { User } from "../../users/model/user";

export interface Inscription {
    id: string | number;
    userId: string | number;
    inscriptionId: string | number;
    user?: User;
    course?: Course;
  }