
import TodoItemSchema from "../../../models/TodoItemSchema";
import status from '../../../enums/status';
import mongoose from "mongoose";



const userServices = {
  

  findToDo: async (query) => {
    return await TodoItemSchema.findOne(query);
  },
  
  updateToDo: async (query, updateObj) => {
    return await TodoItemSchema.findOneAndUpdate(query, updateObj, { new: true });
  }, 
 

  paginateSearch: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE }, isReported: { $ne: true } };
    const {  fromDate, toDate, page, limit } = validatedBody;
    
    if (validatedBody.status) {
      query.status = validatedBody.status
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ]
    }
    let options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 15,
      sort: { createdAt: -1 },
    };
    return await TodoItemSchema.paginate(query, options);
  },
 

  userList: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { walletAddress: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } }
      ]
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ]
    }
    let options = {
      page: page || 1,
      limit: limit || 10,
      sort: { createdAt: -1 },
      select: '-ethAccount.privateKey'
    };
    return await TodoItemSchema.paginate(query, options);
  }, 
 

 


  todoAllDetails: async (_id) => {
    let query = { _id: mongoose.Types.ObjectId(_id), status: { $ne: status.DELETE } };
    return await TodoItemSchema.aggregate([
      { $match: query },
 
      { $sort: { createdAt: -1 } }
    ])
  },

 

}

module.exports = { userServices };

