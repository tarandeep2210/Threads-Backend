import { addNewUser, 
    getUsers , login , register
} from "../controllers/userControllers";

import { addNewThread, 
    getThreads , deleteThread,
} from "../controllers/threadControllers";


const routes = (app) =>{
    app.route('/users')
        .get((req,res,next) => {
                //middleware
                console.log(`request from : ${req.originalUrl}`);
                console.log(`request type : ${req.method}`);
                next();

        }, getUsers)
        .post(addNewUser);

    app.route('/users/login')
        .post(login);
        
    app.route('/users/register')
        .post(register);

    app.route('/threads')
        .get(getThreads)
        .post(addNewThread)

    app.route('/threads/:threadId')    
        .delete(deleteThread);    

}

export default routes;