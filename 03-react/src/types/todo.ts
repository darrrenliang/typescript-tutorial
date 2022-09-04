export type TodoBody = {
    name: string,
    status: string
};

export type myTodo = {
    id: string,
    name: string,
    status: string
};

export enum TodoStatus {
    NoStarted = 'NoStarted',
    Process = 'Process',
};

export type TodoResponse = {
    todos: Array<myTodo>
};

export type SingleTodoResponse = {
    todo: myTodo
};