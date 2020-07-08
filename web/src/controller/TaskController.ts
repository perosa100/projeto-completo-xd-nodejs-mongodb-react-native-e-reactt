import TaskModel from '../model/TaskModel';
import { Request, Response } from 'express';
const current = new Date();
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from 'date-fns';
class TaskController {
  async create(req: Request, res: Response) {
    const task = new TaskModel(req.body);
    await task
      .save()
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  async update(req: Request, res: Response) {
    await TaskModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async all(req: Request, res: Response) {
    const exists = await TaskModel.find({
      macaddress: { $in: req.params.macaddress },
    })
      .sort('when')
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async show(req: Request, res: Response) {
    await TaskModel.findById(req.params.id)
      .then((response) => {
        if (response) {
          return res.status(200).json(response);
        } else {
          return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  async delete(req: Request, res: Response) {
    await TaskModel.deleteOne({
      // prettier-ignore
      '_id': req.params.id
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  async done(req: Request, res: Response) {
    await TaskModel.findByIdAndUpdate(
      // prettier-ignore
      { '_id': req.params.id },
      // prettier-ignore
      { 'done': req.params.done },
      { new: true }
    )
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  async late(req: Request, res: Response) {
    await TaskModel.find({
      // prettier-ignore
      'when': { '$lt': current },
      // prettier-ignore
      'macaddress': { '$in': req.params.macaddress }
    })
      .sort('when')
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  async today(req: Request, res: Response) {
    await TaskModel.find({
      // prettier-ignore
      'macaddress': { '$in': req.params.macaddress },
      // prettier-ignore
      'when': { '$gte': startOfDay(current), '$lte': endOfDay(current) }
    })
      .sort('when')
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  async week(req: Request, res: Response) {
    await TaskModel.find({
      // prettier-ignore
      'macaddress': { '$in': req.params.macaddress },
      // prettier-ignore
      'when': { '$gte': startOfWeek(current), $lte: endOfWeek(current) }
    })
      .sort('when')
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  async month(req: Request, res: Response) {
    await TaskModel.find({
      // prettier-ignore
      'macaddress': { '$in': req.params.macaddress },
      // prettier-ignore
      'when': { '$gte': startOfMonth(current), $lte: endOfMonth(current) }
    })
      .sort('when')
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  async year(req: Request, res: Response) {
    await TaskModel.find({
      // prettier-ignore
      'macaddress': { '$in': req.params.macaddress },
      // prettier-ignore
      'when': { '$gte': startOfYear(current), '$lte': endOfYear(current) }
    })
      .sort('when')
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
}
export default new TaskController();
