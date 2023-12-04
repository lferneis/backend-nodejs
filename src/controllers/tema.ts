import { Request, Response } from 'express';
import Tema from '../models/tema';

export const getTemas = async (req: Request, res: Response) => {
    try {
        const temas = await Tema.findAll({
        });

        res.json(temas);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener los temas.',
        });
    }
};

export const getTema = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tema = await Tema.findOne({
            where: { id }
        });

        if (tema) {
            res.json(tema);
        } else {
            res.status(404).json({
                msg: `No existe un tema con el id ${id}`,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener el tema.',
        });
    }
};

export const deleteTema = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tema = await Tema.findByPk(id);

    if (!tema) {
        res.status(404).json({
            msg: `No existe un tema con el id ${id}`,
        });
    } else {
        await tema.destroy();
        res.json({
            msg: 'El tema fue eliminado con éxito!',
        });
    }
};

export const postTema = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Tema.create(body);

        res.json({
            msg: `El tema fue agregado con éxito!`,
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrió un error, comuníquese con soporte`,
        });
    }
};

export const updateTema = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const tema = await Tema.findByPk(id);

        if (tema) {
            await tema.update(body);
            res.json({
                msg: 'El tema fue actualizado con éxito',
            });
        } else {
            res.status(404).json({
                msg: `No existe un tema con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrió un error, comuníquese con soporte`,
        });
    }
};