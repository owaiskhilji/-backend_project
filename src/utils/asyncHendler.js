// ye tareeka promise wala h
const asyncHendler = (reqHendler) => {
  return (req, res, next) => {
      Promise.resolve(reqHendler(req, res, next)).catch((err) => next("asyncHendler error",err));
  };
};
export default asyncHendler;



// ye tareeka trycatch wala h 
// const asyncHendler = (reqHendler) => {
//     try {
//         async (req,res,next) =>{
//                 await reqHendler(req,res,next)
//             }
//     } catch (error) {
//         res.status(err.code)
//         .json({
//             message : err.message,
//             success : false
//         })
//     }    
// }

