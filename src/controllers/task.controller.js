import Task from "../models/Task";
import { getPagination } from "../libs/getPagination";

export const findAllTasks = async (req, res) => {
  try {
    const { size, page, titulo } = req.query;

    const condition = titulo
      ? {
          titulo: {
            $regex: new RegExp(titulo),
            $options: "i",
          },
        }
      : {};

    const { limit, offset } = getPagination(page, size);
    const data = await Task.paginate(condition, { offset, limit });

    res.json({
      totalItems: data.totalDocs,
      tasks: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al traer las tareas",
    });
  }
};

export const createTask = async (req, res) => {
  if (!req.body.titulo) {
    return res.status(400).json({
      message: "El titulo es requerido",
    });
  }
  try {
    const newTask = new Task({
      titulo: req.body.titulo,
      contenido: req.body.contenido,
      done: req.body.done ? req.body.done : false,
    });
    const taskSaved = await newTask.save();
    res.json(taskSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al crear la tarea",
    });
  }
};

export const findAllDoneTask = async (req, res) => {
  try {
    const tasks = await Task.find({ done: true });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al traer las tareas",
    });
  }
};

export const findOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task)
      return res.staus(404).json({ message: "La tarea no existe con ese ID" });
    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al traer la tarea con ese ID",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    res.json({
      message: "Tarea eliminada",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al eliminar la tarea",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      message: "Tarea modificada",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al modificar la tarea",
    });
  }
};
