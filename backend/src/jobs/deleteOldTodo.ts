import Todo from "../model/todo.js";

export const deleteOldTodo = async (): Promise<void> => {
  try {
    const today = new Date();
    const tenDayAgo = new Date();
    tenDayAgo.setDate(today.getDate() - 10);

    const result = await Todo.deleteMany({
      endDate: { $lt: tenDayAgo },
    });

    if (result.deletedCount === 0) {
      console.log("No older todo found!");
      return;
    }

    console.log(`Deleted ${result.deletedCount} old todos`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(
        "Error occurred while deleting old todos: " + err.message
      );
    }
    throw new Error("Unknown error while deleting todos");
  }
};