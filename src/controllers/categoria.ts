import { Request, Response } from 'express';
import Categoria from '../models/categoria';
import Subcategoria from '../models/subcategoria';

export const getCategories = async (req: Request, res: Response) => {
    const listCategories = await Categoria.findAll({
        include:
        {
            model: Subcategoria
            
        },
    });

    res.json(listCategories)
}

export const getCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await Categoria.findOne({
        where: {id},
        include: 
            {
                model: Subcategoria
            },
    });

    if (category) {
        res.json(category)
    } else {
        res.status(404).json({
            msg: `No existe la Categoria con el id ${id}`
        })
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Verifica si la categoría tiene subcategorías
        const tieneSubcategorias = await Subcategoria.count({
            where: {
                categoriaId: id
            }
        });

        // Si no tiene subcategorías, procede con la eliminación
        if (tieneSubcategorias === 0) {
            const category = await Categoria.findByPk(id);

            if (!category) {
                res.status(404).json({
                    msg: `No existe la Categoría con el id ${id}`
                });
            } else {
                await category.destroy();
                res.json({
                    msg: 'La categoría fue eliminada con éxito!'
                });
            }
        } else {
            res.status(400).json({
                msg: 'No se puede eliminar la categoría porque tiene subcategorías'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al intentar eliminar la categoría'
        });
    }
};


export const postCategory = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Categoria.create(body);

        res.json({
            msg: `La categoria fue agregado con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const category = await Categoria.findByPk(id);

    if(category) {
        await category.update(body);
        res.json({
            msg: 'La categoria fue actualizado con exito'
        })

    } else {
        res.status(404).json({
            msg: `No existe la categoria con el id ${id}`
        })
    }
        
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }

    
}