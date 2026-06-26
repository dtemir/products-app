import { Request, ResponseToolkit, ServerRoute } from '@hapi/hapi';
import Joi from 'joi';
import { ProductService } from '../services/product.service';

const service = new ProductService();

export const productRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/products',
    handler: async (request: Request, h: ResponseToolkit) => {
      try {
        const products = await service.getProducts();
        return h.response(products).code(200);
      } catch (error: any) {
        return h.response({ error: error.message }).code(500);
      }
    },
  },
  {
    method: 'POST',
    path: '/products',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().trim().required().messages({
            'string.empty': 'Product name cannot be empty',
            'any.required': 'Product name is required',
          }),
        }),
        failAction: (request, h, err) => {
          throw err || new Error('Validation error');
        },
      },
    },
    handler: async (request: Request, h: ResponseToolkit) => {
      try {
        const payload = request.payload as { name: string };
        const newProduct = await service.createProduct({ name: payload.name });
        return h.response(newProduct).code(201);
      } catch (error: any) {
        return h.response({ error: error.message }).code(500);
      }
    },
  },
];
