import {NextPage} from "next";
import Layout from "../layouts/Layout";
import {axiosBackend} from "../utils/axios";
import {useState} from "react";
import {Button, Checkbox} from "@mui/material";
import useEffectUpdate from "../hooks/useEffectUpdate";
import Typography from "@mui/material/Typography";
import {Favorite, FavoriteBorder} from "@mui/icons-material";

// ----------------------------------------------------------------------

type Task = {
    id: number;
    title: string;
    done: boolean;
    url: string;
}

// ----------------------------------------------------------------------

const HomePage: NextPage = ({}) => {

    const [switcher, setSwitcher] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffectUpdate(() => {
        (async () => {
            try {
                const response = await axiosBackend.get('api/todo');

                console.log(response.data)

                setTasks(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [switcher])

    return (
        <>
            <h1>Main Page</h1>
            <Button onClick={() => setSwitcher(prevState => !prevState)} sx={{mb: 2}}>res</Button>

            {tasks?.map((task, index) =>
                <Typography
                    key={task.id}
                >
                    {++index}.
                    <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} checked={task.done}/>
                    {task.title}
                </Typography>
            )}
        </>
    )
}

// ----------------------------------------------------------------------

// @ts-ignore
HomePage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default HomePage;

