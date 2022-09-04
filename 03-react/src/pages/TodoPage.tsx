import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { myTodo, TodoStatus } from '../types/todo';
import { Card } from 'primereact/card';
import { confirmDialog } from 'primereact/confirmdialog';

export default function TodoPage() {
    const [inputTodo, setInputTodo] = useState<string>('');
    // const [todoList, setTodoList] = useState<Array<myTodo>>([]);

    const tempArray: Array<myTodo> = [
        { id: '0', name: 'Mon', status: TodoStatus.NoStarted },
        { id: '1', name: 'Tue', status: TodoStatus.Process },
        { id: '2', name: 'Wed', status: TodoStatus.NoStarted }
    ];

    const StartDialog = (todoObject: myTodo) => {
        return confirmDialog({
            message: 'Are you sure you want to Start?',
            header: 'Start Todo',
            accept: () => (console.log('accept start')),
            reject: () => (console.log('reject start'))
        })
    }

    const TodoTemplate = (todoObject: myTodo) => {
        return (
            <div key={todoObject.id}>
                <Card title={todoObject.name} footer={TodoFooter(todoObject)}>
                    {todoObject.status === TodoStatus.NoStarted ? NoStartedTag() : ProcessTag()}
                </Card>
            </div>
        )
    };

    const TodoFooter = (todoObject: myTodo) => {
        return (<span>
            <Button className="p-button-outlined p-button-success" label='Start' icon='pi pi-play' onClick={(e) => StartDialog(todoObject)}></Button>
            <Button className="p-button-outlined p-button-danger" label='Delete' icon='pi pi-trash' onClick={(e) => console.log('Delete', todoObject)}></Button>
        </span>)
    };

    const NoStartedTag = () => (<Tag icon="pi pi-check" severity="success" value="Not Started"></Tag>);
    const ProcessTag = () => (<Tag icon="pi pi-fw pi-sync" severity="warning" value="Process"></Tag>);

    return (
        <>
            <h1>TodoPage</h1>
            <div>
                <span className="p-float-label">
                    <InputText id="inputText" value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} />
                    <label htmlFor='inputText'>Create Todo</label>
                    <Button label='Submiit' onClick={(e) => console.log(inputTodo)}></Button>
                </span>
            </div>
            <div>
                {tempArray.map((e, i, arr) => TodoTemplate(e))}
            </div>
        </>
    )
}