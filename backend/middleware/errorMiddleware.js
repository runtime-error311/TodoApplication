
const errorMiddleware = (err, req, res, next) => {
  console.error("Mein error hoon",err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
}
export default errorMiddleware;