import { CommentUser } from "../../shared/models/comment.mode";

export class TaskModel {
    taskId: number = 0;
    typeId: number | undefined;
    priorityId: number | undefined;
    projectId: number | undefined;
    statusId: string = '';
    taskName: string | undefined;
    priorityTask: Priority = new Priority();
    taskTypeDetail: any | undefined;
    assigness: any[] | undefined;
    listUserAsign: number[] = [];
    lstComment: CommentUser[] | undefined;
    alias: string | undefined;
    description: string = '';
    originalEstimate: number = 0;
    timeTrackingSpent: number = 0;
    timeTrackingRemaining: number = 0;

}

export class Priority {
    priorityId: number | undefined;
    priority: string | undefined;
    description: string | undefined;
    deleted: boolean = false;
    alias: string | undefined;

}

export class TaskType {
    id: number = 0;
    taskType: string = ''
}