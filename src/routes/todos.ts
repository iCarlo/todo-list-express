import express from 'express';
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from '../controllers/todos';

export default (router: express.Router) => {
  router.get('/todos', getAllTodos);
  router.get('/todos/:id', getTodoById);
  router.post('/todos', createTodo);
  router.put('/todos/:id', updateTodo);
  router.delete('/todos/:id', deleteTodo);
}