import app from "./app";
import * as dotenv from 'dotenv';
dotenv.config();
import User from "./models/User"; 


const port = process.env.PORT || 3000; 


(async () => {
    try {
        await User.sync(); 
        console.log('synced to local database')
        app.listen(port, () => {
            console.log(`server is running on port ${port}`)
        }) 
    }
    catch (err) {
        console.error('error syncing', err); 
    }
})();
 