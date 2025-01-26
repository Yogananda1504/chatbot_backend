import { Router } from "express";
const signOutRouter: Router = Router();

signOutRouter.post('/', (req, res) => {
    try {
        res.clearCookie('jwt'); 
        res.status(200).json({ message: 'Successfully signed out' });
        
    } catch (error) {
        console.log('Error signing out:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default signOutRouter;
