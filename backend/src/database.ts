import { connect } from "mongoose";
export async function startConxion() {
    try {
    await connect("mongodb+srv://kevinponce:f.ERYaYt9TDrNpy@post-db.lv75s.mongodb.net/?retryWrites=true&w=majority&appName=post-db")
    } catch (error) {
        console.error(error)
        throw error
    }    
}