import Joi from "joi";
import _, { isNull } from "lodash"; 
import config from "config";
import apiError from '../../../../helper/apiError';
import response from '../../../../../assets/response';  
import { parse } from 'json2csv';

import responseMessage from '../../../../../assets/responseMessage';
import { userServices } from '../../services/user';    
const {  findToDo, todoAllDetails,  updateToDo, paginateSearch, } = userServices; 

  
import jwt from 'jsonwebtoken';
import status from '../../../../enums/status';
import userType from "../../../../enums/userType"; 

import commonFunction from "../../../../helper/util";
import TodoItemSchema from '../../../../models/TodoItemSchema'
export class todoController {

 
  /**
   * @swagger
   * /todo/addToDo:
   *   post:
   *     tags:
   *       - TODO
   *     description: addToDo
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: description
   *         description: description
   *         in: formData
   *         required: true
   *       - name: status
   *         description: status
   *         in: formData
   *         required: true 
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async addToDo(req, res, next) {
    const validationSchema = Joi.object({
      description: Joi.string().required(),
      status: Joi.string().valid('PENDING', 'COMPLETE').required()
    });
  
    try {
      const { description, status } =  await Joi.validate(req.body, validationSchema);
  
      if (![description, status].every(Boolean)) {
        throw apiError.badRequest(responseMessage.ALL_FIELDS);
      }
  
      const newTodo = new TodoItemSchema({ description, status });
      const savedTodo = await newTodo.save();
  
      return res.status(201).json({ 
        message: responseMessage.TODO_CREATED, 
        todo: savedTodo 
      });
    } catch (error) {
      console.log("error======>>>>", error)
      return next(error);
    }
  }; 

  /**
   * @swagger
   * /todo/deleteToDo:
   *   delete:
   *     tags:
   *       - TODO
   *     description: deleteToDo
   *     produces:
   *       - application/json
   *     parameters: 
   *       - name: _id
   *         description: deleteToDo
   *         in: query
   *         required: true 
   *     responses:
   *       200:
   *         description: Returns success message
   */


  async deleteToDo(req, res, next) {
    const validationSchema = {
      _id: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema); 
      console.log("validationSchema======>>>",validatedBody)
      var userInfo = await TodoItemSchema.findOne({
        _id: validatedBody._id,
        status: { $ne: status.DELETED },
      });
      if (!userInfo) {
        throw apiError.notFound(responseMessage.TODO_NOT_FOUND);
      }
      let deleteRes = await TodoItemSchema.findOneAndUpdate(
        { _id: userInfo._id },
        { status: status.DELETED },
        { new: true }
      );
      console.log("deleteRes=======",status)
      return res.json(new response(deleteRes, responseMessage.TODO_DELETED));
    } catch (error) {
      return next(error);
    }
  }

 

    /**
    * @swagger
    * /todo/getTodoById/{_id}:
    *   get:
    *     tags:
    *       - TODO
    *     description: getTodoById
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: _id
    *         description: _id
    *         in: path
    *         required: true
    *     responses:
    *       200:
    *         description: Data found successfully.
    *       404:
    *         description: User not found.
    */

    async getTodoById(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required()
        };
        try {
            let userResult;
            const { _id } = await Joi.validate(req.params, validationSchema);
            userResult = await todoAllDetails(_id);
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            return res.json(new response(userResult, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
      * @swagger
      * /todo/updateToDo:
      *   put:
      *     tags:
      *       - TODO
      *     description: updateToDo
      *     produces:
      *       - application/json
      *     parameters: 
      *       - name: todoId
      *         description: todoId
      *         in: query
      *         required: true
      *       - name: description
      *         description: description
      *         in: query
      *         required: false
      *       - name: status
      *         description: status
      *         in: query
      *         required: false   
      *     responses:
      *       200:
      *         description: Returns success message
      */

    async updateToDo(req, res, next) {
      const validationSchema = {
        todoId: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
      };
      try {const validatedBody = await Joi.validate(req.query, validationSchema); 
    
        console.log("todoResult=======>>>>", validatedBody);
    
        const todoResult = await TodoItemSchema.findOne({ _id: validatedBody.todoId });
    
        if (!todoResult) {
          throw apiError.notFound(responseMessage.TODO_NOT_FOUND);
        }
    
        const updated = await TodoItemSchema.findByIdAndUpdate(
          todoResult._id,
          {
            $set: {
              description: validatedBody.description,
              status: validatedBody.status
            }
          },
          { new: true } // This option ensures the returned document is the updated one
        );
    
        return res.json({
          result: updated,
          responseMessage: responseMessage.TODO_UPDATED,
          statusCode: 200
        });
        } catch (error) {
            console.log("==============>>>>>>>>>",error)
            return next(error);
        }
    }
 

    /**
     * @swagger
     * /todo/toDoList:
     *   get:
     *     tags:
     *       - TODO
     *     description: toDoList
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: status
     *         description: status
     *         in: query
     *       - name: search
     *         description: search
     *         in: query
     *         required: false
     *       - name: fromDate
     *         description: fromDate
     *         in: query
     *         required: false
     *       - name: toDate
     *         description: toDate
     *         in: query
     *         required: false
     *       - name: page
     *         description: page
     *         in: query
     *         type: integer
     *         required: false
     *       - name: limit
     *         description: limit
     *         in: query
     *         type: integer
     *         required: false
     *     responses:
     *       200:
     *         description: Data found successfully.
     *       404:
     *         description: Data not found.
     */

    async toDoList(req, res, next) {
        const validationSchema = {
            status: Joi.string().optional(),
            search: Joi.string().optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            let dataResults = await paginateSearch(validatedBody);
            if (dataResults.length == 0) {
                throw apiError.notFound([], responseMessage.DATA_NOT_FOUND)
            }
            return res.json(new response(dataResults, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }



  /**
   * @swagger
   * /todo/uploadToDO:
   *   post:
   *     tags:
   *       - TODO
   *     description: uploadToDO
   *     produces:
   *       - application/json
   *     parameters: 
   *       - name: uploadToDO
   *         description: uploadToDO
   *         in: formData
   *         type: file
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async uploadToDO(req, res, next) {
    try {
      
      const { files } = req;
      const imageFiles = await commonFunction.getImageUrl(files);
      if (imageFiles) {
        let obj = {
          secure_url: imageFiles,
          original_filename: files[0].filename,
        };
        return res.json(new response(obj, responseMessage.UPLOAD_SUCCESS));
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
  



/**
 * @swagger
 * /todo/toDoDownload:
 *   get:
 *     tags:
 *       - TODO
 *     description: toDoDownload
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns success message
 */
async toDoDownload(req, res, next) {
  try {
    // Fetch all todos
    const todos = await TodoItemSchema.find();

    // Map todos to desired CSV format with padding
    const todosData = todos.map(todo => ({
      _id: `${todo._id} `, // Adding extra space
      description: ` ${todo.description} `, // Adding padding around description
      status: ` ${todo.status} `, // Adding padding around status
      createdAt: ` ${todo.createdAt} `, // Adding padding around createdAt
      updatedAt: ` ${todo.updatedAt} `, // Adding padding around updatedAt
    }));

    // Convert todos to CSV format
    const csv = parse(todosData);

    // Send the CSV file as a response
    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename=todos.csv');
    res.status(200).send(csv);

  } catch (error) {
    console.error("DownloadTodos error:", error);
    return next(error);
  }
}

  
}

export default new todoController()
 