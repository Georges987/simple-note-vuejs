import type { Status } from "../types";

interface ITask {
    id?: number;
    name: string;
    description?: string;
    status: Status;
}

export type { ITask };