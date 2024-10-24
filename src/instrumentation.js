import connectDb from './database/connect'

export async function register() {
    await connectDb()
}
