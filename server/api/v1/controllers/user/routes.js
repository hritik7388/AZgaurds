import Express from "express";
import controller from "./controller"; 
import upload from '../../../../helper/uploadHandler';


export default Express.Router()   
    .get('/toDoList', controller.toDoList) 
    .get('/getTodoById/:_id', controller.getTodoById) 
    .post('/addToDo', controller.addToDo)
    .delete('/deleteToDo',controller.deleteToDo)  
    .put('/updateToDo', controller.updateToDo) 
    
  .use(upload.uploadFile)  
  .post("/uploadToDO", controller.uploadToDO) 
  .get('/toDoDownload',controller.toDoDownload)
    
    