import { validationTodo } from "../config/validation.js";
import Todo from "../model/todo.js";



export const createTodo = async (req,res)=>{
    try{
        const {title,description,completed,endDate} = req.body;
        const {userId} = req;
        // const {userId} = req.session;

        if(!title || !description){
            return res.status(400).json({
                message:"All inputs are required!"
            })
        }
        const validation = validationTodo(req.body);
        if(validation!="Valid Inputs!"){
            return res.status(400).json({
                message:validation
            })
        }

        const newTodo = await Todo.create({
            title,description,completed:completed?completed:false,user:userId,endDate
        })

        return res.status(200).json({
            message:"Todo Created Successfully!",
            data:newTodo
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Create Todo err is " + err
        })
    }
};

export const singleTodo = async (req,res)=>{
    try{
        const {id} = req.params;
        const todo = await Todo.findById(id);
        if(!todo){
            return res.status(404).json({
                message:"No todo found!"
            })
        }
        res.status(200).json({
            message:"Todo found successfully!",
            data:todo
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Get Single Todo err is " + err
        })
    }
};

export const allUserTodos = async (req,res)=>{
    try{
        const {userId} = req;
        // const {userId} = req.session;


        const today = new Date();
        today.setHours(0,0,0,0);
        today.setDate(today.getDate()-1);
 
        const tomorrow = new Date(today);

        tomorrow.setDate(today.getDate() + 1);


        const overdue = await Todo.find({endDate: { $lt: today },user:userId}).sort({ endDate: 1 });
        
        const todayTodos = await Todo.find({endDate: { $gte: today, $lt: tomorrow },user:userId}).sort({ endDate: 1 });

        const upcoming = await Todo.find({endDate: { $gte: tomorrow },user:userId}).sort({ endDate: 1 });


        res.status(200).json({
            message:"Todos found successfully",
            data:{
                overdue,todayTodos,upcoming
            }
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Get all user's todos err is " + err
        })
    }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    // const {userId} = req.session;
    const {userId} = req;
    const validation = validationTodo(req.body);
    if(validation!="Valid Inputs!"){
        return res.status(400).json({
            message:validation
        })
    }
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    return res.status(200).json({
      message: "Todo updated successfully",
      data: updatedTodo
    });

  } catch (err) {
    return res.status(500).json({
      message: "Update Todo err is " + err
    });
  }
};

export const deleteTodo = async (req,res)=>{
    try{
        const {userId} = req;
        // const {userId} = req.session;
        const {id} = req.params;
        await Todo.findOneAndDelete({_id:id,user:userId});
        if(!deleteTodo) {
            return res.status(404).json({
                message:"No todo found"
            })
        }
        return res.status(200).json({
            message:"Todo deleted successfully!"
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Delete Todo err is " + err
        })
    }
};
