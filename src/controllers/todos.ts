import express from 'express';
import { TodoModel } from '../models/todo';

export const getAllTodos = async (req: express.Request, res: express.Response) => {
  try {
    const page = parseInt((req.query.page as string)) || 1;
    const limit = parseInt((req.query.limit as string)) || 3;

    const result = await TodoModel.find({isArchived: false})
    .skip((page - 1) * limit)
    .limit(limit);

    const count = await TodoModel.countDocuments({isArchived: false});


    return res.status(200).json({
      result,
      currentPage: page,
      nextPage: page * limit < count ? page + 1 : page,
      total: count
    });
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getTodoById = async (req: express.Request, res: express.Response) => {
  try {
    const todo = await TodoModel.findById(req.params.id);

    if(todo){
      return res.status(200).json(todo);
    } else {
      return res.status(404).json('Todo not found');
    }

    
  } catch (error) {
    return res.status(404).json('Todo not found');
  }
}

export const createTodo = async (req: express.Request, res: express.Response) => {
  try {
    const newTodo = await new TodoModel(req.body).save().then((todo) => todo.toObject());

    return res.status(201).json(newTodo)
    
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const updateTodo = async (req: express.Request, res: express.Response) => {
  try {
    const todo = await TodoModel.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((todo) => todo.toObject());

    return res.status(201).json(todo)
    
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const deleteTodo = async (req: express.Request, res: express.Response) => {
  try {
    const todo = await TodoModel.findByIdAndUpdate(req.params.id, {isArchived: true}, {new:true});

    return res.status(201).json(todo)
    
  } catch (error) {
    return res.status(400).json(error);
  }
}
