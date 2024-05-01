import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import {getLoginInfo} from "../utils/LoginInfo.tsx";
import instance from "../api/axios.api.ts";
import {toast} from "react-toastify";

interface TodoModel{
    title:string;
    date:string;
    id:number;
}

const Home: FC = () => {
    const [todos, setTodos] = React.useState<TodoModel[]>([]);

    const getAllTodos = async () =>{
        const response = await instance.get(`/todo/all`);
        setTodos(response.data);
    }

    React.useEffect(() => {
        if (todos.length === 0)
            getAllTodos();
    }, []);

    return (
        <div className={'mt-40 flex flex-col justify-center items-center bg-gray-700 text-white'}>
            <h1 className={'mb-10 text-center text-xl'}>
                Все Задачи
            </h1>

            <form
                onSubmit={(e) => e.preventDefault()}
                className={'mx-auto flex w-1/3 flex-col gap-5'}>

                <div>
                    {todos.length === 0 ? (
                        <div className="text-white flex justify-center items-center h-96">
                            {/* Центрируем текст "Нет записей" */}
                            Нет записей
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div key={todo.id} className="flex flex-col max-w-screen-2xl bg-gray-800 text-white rounded p-4 mb-4 shadow-lg">
                                <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
                                <p className="text-sm mb-2">Дата: {todo.date}</p>
                            </div>
                        ))
                    )}
                </div>
            </form>
        </div>
    );
};

export default Home;


