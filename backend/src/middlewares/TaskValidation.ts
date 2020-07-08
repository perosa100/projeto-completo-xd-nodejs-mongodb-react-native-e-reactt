import { Request, Response, NextFunction } from 'express';
import { isPast } from 'date-fns';
import TaskModel from '../model/TaskModel';

export const TaskValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { macaddress, type, title, description, when } = req.body;

  if (!macaddress) {
    return res.status(400).json({ errors: 'macaddress é obrigatorio' });
  }

  if (!type) {
    return res.status(400).json({ errors: 'type é obrigatorio' });
  }

  if (!title) {
    return res.status(400).json({ errors: 'title é obrigatorio' });
  }

  if (!type) {
    return res.status(400).json({ errors: 'macaddress é obrigatorio' });
  }

  if (!description) {
    return res.status(400).json({ errors: 'description é obrigatorio' });
  }

  if (!when) {
    return res.status(400).json({ errors: 'when é obrigatorio' });
  }

  let existis;
  if (req.params.id) {
    existis = await TaskModel.findOne({
      // prettier-ignore
      '_id':{ '$ne':req.params.id},
      // prettier-ignore
      'when': { '$eq': new Date(when) },
      // prettier-ignore
      'macaddress': { '$in': macaddress }
    });
  } else {
    if (isPast(new Date(when))) {
      return res
        .status(400)
        .json({ errors: 'Escolha uma data e hora no futuro' });
    }
    existis = await TaskModel.findOne({
      // prettier-ignore
      'when': { '$eq': new Date(when) },
      // prettier-ignore
      'macaddress': { '$in': macaddress }
    });
  }

  if (existis) {
    return res
      .status(400)
      .json({ errors: 'Já existe uma tarefa nesse dia e horário ' });
  }
  next();
};
