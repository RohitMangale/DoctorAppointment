    import express from 'express';
    import { getAllUsers,getSingleUser,deleteUser,updateUser, getUserProfile, getMyAppointments } from '../Controllers/userController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';


const router = new express.Router();

router.get('/:id', authenticate, restrict(['patient']) ,getSingleUser);
router.get('/', authenticate, restrict(['admin']),getAllUsers);
router.delete('/:id', authenticate, restrict(['patient']) ,deleteUser);
router.put('/:id', authenticate, restrict(['patient']),updateUser);
router.get('/profile/me', authenticate, restrict(['patient']),getUserProfile);
router.get('/appointments/my-appointments', authenticate, restrict(['patient']),getMyAppointments);


export {router as userRoute};



