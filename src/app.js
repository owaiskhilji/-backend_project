import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express()
const CORS_ORIGIN = process.env.ORIGIN
app.use(cors({
    origin: CORS_ORIGIN,
    credential:true
}))
// kbi kbar json se  bh data ata h to os k lie e lga na para ta h mgr limit me
app.use(express.json({limit:"16kb"}))
// jb ap url me data dalte ho to wo kudi apne pas se sign laga deta h to ye kuhd nh laga ta hme express ko bta na pqar ta h jese k mene google pr owaiskhilji likha to os ne khudi sign bara die take ye batane k liye waha se bh data askta h smaj na ise
app.use(express.urlencoded({expended : true , limit:"16kb"})) // expended object me nested object bna ta h 
// kbh ap server pr pdf file ya image store krna chate h 
app.use(express.static("Public"))
export { app }