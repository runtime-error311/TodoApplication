import Todo from "../model/todo.js";
export const deleteOldTodo = async()=>{
    try{
        const today = new Date();
        const tenDayAgo = today.setDate(today.getDate() - 10);
        const tenDayAgoTodo = await Todo.deleteMany({endDate:{$lt:tenDayAgo}});
        if(!tenDayAgoTodo) console.log("No older todo found!");
        console.log(`Deleted ${tenDayAgoTodo.deletedCount} old todos`);
        
    }
    catch(err){
        console.log("Error occured while deleting old todo is ",err.message);
    }
}