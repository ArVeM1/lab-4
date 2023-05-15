import React from 'react';
import ListItems from "../components/ListItems";
import {Button} from "@mui/material";
import CreateModal from "../components/CreateModal";
import {useAppSelector} from "../store/store";
import Typography from "@mui/material/Typography";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const Home: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const {searchValue, count, delCount, todo} = useAppSelector(state => state.todo);
    const [visible, setVisivle] = React.useState(true);
    const isMounted = React.useRef(false);

    const filterTodo = useAppSelector(state => {
        return state.todo.todo.filter(u =>  u.title.toLowerCase().includes(searchValue.toLowerCase()))
    })

    const filterTodoTrue = filterTodo.filter(item => item.check === true);
    const filterTodoFalse = filterTodo.filter(item => item.check === false);

    React.useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(todo);
            localStorage.setItem('todos', json);
        }

        isMounted.current = true;
    }, [todo]);

    const data = {
        labels: ['В процессе', 'Завершенные'],
        datasets: [
            {
                label: '# задач',
                data: [filterTodoFalse.length, filterTodoTrue.length],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ]
    }

    const data2 = {
        labels: ['Всего создано', 'Удаленных'],
        datasets: [
            {
                label: '# задач',
                data: [count, delCount],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ]
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className="home">
            <Button
                variant="contained"
                className="home-btn"
                onClick={handleOpen}
            >
                Добавить задачу
            </Button>
            <CreateModal handleClose={handleClose} open={open}/>

            <Button
                variant="contained"
                className="home-btn"
                onClick={() => setVisivle(!visible)}
            >
                Задачи
            </Button>

            {visible
                ?
                <>
                    <Typography>Актуальные задачи</Typography>
                    <ListItems data={filterTodoFalse}/>
                </>

                :
                <>
                    <Typography>Завершенные задачи</Typography>
                    <ListItems data={filterTodoTrue}/>
                </>
            }

            <div className="graphics">
                <Doughnut data={data} />
                <Pie data={data2} />
            </div>

        </div>
    );
};

export default Home;