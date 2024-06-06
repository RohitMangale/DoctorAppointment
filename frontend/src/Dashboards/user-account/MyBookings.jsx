import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
import { BASE_URL } from "../../config";
import useFetchData from '../../hooks/useFetchData';
import DoctorsCard from '../../components/doctors/DoctorsCard';


const MyBookings = () => {

  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`)

  return (


    <div>
      {loading & error && <Loading />}

      {error && loading && <Error errMessage={error} />}

      {loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map(doctor => (
            <DoctorsCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}



      {(!loading && !error && appointments.length === 0) && (<h2 className="mt-5  leading-7 text-[20px] font-semibold text-center text-primaryColor">
      You did not book any doctor yet!
      </h2>
    )}
</div>
  )
}

export default MyBookings
