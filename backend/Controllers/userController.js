import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";


export const updateUser = async (req, res) => {
    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true }).select("-password");
        res.status(200).json({ success: true, message: 'Successfully Updated', data: updatedUser });
    }
    catch (err) {
        res.status(400).json({ success: false, message: 'Failed to update' });
    }
}



export const deleteUser = async (req, res) => {
    const id = req.params.id

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Successfully Deleted' });
    }
    catch (err) {
        res.status(400).json({ success: false, message: 'Failed to delete' });
    }
}



export const getSingleUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id).select("-password");
        res.status(200).json({ success: true, message: 'Found User', data: user });
    }
    catch (err) {
        res.status(404).json({ success: false, message: 'User not found' });
    }
}



export const getAllUsers = async (req, res) => {

    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({ success: true, message: 'Found Users', data: users });
    }
    catch (err) {
        res.status(404).json({ success: false, message: 'Users not found' });
    }
}


export const getUserProfile = async (req, res) => {
    const userId = req.userId
    console.log(userId)
    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { password, ...rest } = user._doc

        res.status(200).json({ success: true, message: 'Profile info is getting', data: { ...rest } })

    } catch (error) {
        res.status(500).json({ success: false, message: "Something wend Wrong, Could not get Profile " })
    }
}

export const getMyAppointments = async(req,res) => {
    try {

        // step - 1: retrieve appointments from booking for specific user 
        const bookings = await Booking.find({user:req.userId})


        // step - 2: extraact doc ids from appointment booking 
        const doctorIds = bookings.map(el => el.doctor.id);

        // step - 3: retrieve docs using doc ids 
        const doctors = await Doctor.find({_id:{$in:doctorIds}}).select('-password')

        res.status(200).json({success:true,message:'Appoints are getting',data:doctors});
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Something wend Wrong, Could not get Appointments"})
    }
}




