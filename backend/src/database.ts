import { connect } from "mongoose";
export async function startConxion() {
    try {
    await connect("mongodb://localhost:27017/post-db")
    } catch (error) {
        console.error(error)
        throw error
    }    
}