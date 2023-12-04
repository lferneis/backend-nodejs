import { Request, Response } from 'express';
import Subcategoria from '../models/subcategoria';
import Tema from '../models/tema';
import Categoria from '../models/categoria';

export const getSubcategories = async (req: Request, res: Response) => {
    const listSubcategories = await Subcategoria.findAll({
        include: [
            {
                model: Categoria

            }, {
                model: Tema
            }
        ]
    });

    res.json(listSubcategories);
};

export const getSubcategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const subcategory = await Subcategoria.findOne({
        where: { id },
        include: [
            {
                model: Categoria

            }, {
                model: Tema
            }
        ]
    });

    if (subcategory) {
        res.json(subcategory);
    } else {
        res.status(404).json({
            msg: `No existe la Subcategoría con el id ${id}`
        });
    }
};

export const deleteSubcategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Verifica si la subcategoría tiene temas
        const tieneTemas = await Tema.count({
            where: {
                subcategoriaId: id
            }
        });

        // Si no tiene temas, procede con la eliminación
        if (tieneTemas === 0) {
            const subcategory = await Subcategoria.findByPk(id);

            if (!subcategory) {
                res.status(404).json({
                    msg: `No existe la Subcategoría con el id ${id}`
                });
            } else {
                await subcategory.destroy();
                res.json({
                    msg: 'La subcategoría fue eliminada con éxito!'
                });
            }
        } else {
            res.status(400).json({
                msg: 'No se puede eliminar la subcategoría porque tiene temas'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al intentar eliminar la subcategoría'
        });
    }
};

export const postSubcategory = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        // Verifica si la categoría padre existe
        const categoriaPadre = await Categoria.findByPk(body.categoriaId);

        if (!categoriaPadre) {
            res.status(404).json({
                msg: `No existe la Categoría con el id ${body.categoriaId}`
            });
        } else {
            // La categoría padre existe, entonces crea la subcategoría
            await Subcategoria.create(body);
            res.json({
                msg: `La subcategoría fue agregada con éxito!`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al intentar agregar la subcategoría'
        });
    }
};


export const updateSubcategory = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const subcategory = await Subcategoria.findByPk(id);

        if (subcategory) {
            await subcategory.update(body);
            res.json({
                msg: 'La subcategoría fue actualizada con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe la subcategoría con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrió un error, comuníquese con soporte`
        });
    }
}
