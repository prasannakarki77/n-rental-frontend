import { BsFillPenFill, BsFillBookmarksFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteBooking from "./DeleteBooking";
import UpdateBookingStatus from "./UpdateBookingStatus";

const BookingDashboard = () => {
  const [updateBookingStatus, setUpdateBookingStatus] = useState(false);
  const [deleteBooking, setDeleteBooking] = useState(false);
  const [bookingList, setBookingList] = useState([]);
  const [booking, setBooking] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };
  useEffect(() => {
    axios
      .get("http://localhost:90/booking/get", config)
      .then((res) => {
        setBookingList(res.data.data);
        console.log(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const updateBookingStatusHandler = (booking) => {
    setBooking(booking);
    setUpdateBookingStatus(true);
  };
  const deleteBookingHandler = (booking) => {
    setBooking(booking);
    console.log(booking);
    setDeleteBooking(true);
  };

  return (
    <>
      <div className="dashboard-content">
        <div className="dashboard__title mb-4">
          <h1 className="dashboard__title--text ">
            <BsFillBookmarksFill /> Bookings
          </h1>
        </div>
        <div className="container ">
          <div className="d-flex ">
            <DeleteBooking
              show={deleteBooking}
              onHide={() => setDeleteBooking(false)}
              booking={booking}
            />
            <UpdateBookingStatus
              show={updateBookingStatus}
              onHide={() => setUpdateBookingStatus(false)}
              booking={booking}
            />
            <button type="button" className=" ms-2 btn btn-danger">
              <FaTrashAlt /> Delete All
            </button>
          </div>
          <div className="table-responsive">
            <table className="table mt-3">
              <thead className="thead-dark bg-dark text-white">
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">User</th>
                  <th scope="col">Vehicle</th>
                  <th scope="col">Image</th>
                  <th scope="col">No. of Days</th>
                  <th scope="col">Date and Time</th>
                  <th scope="col">Contact No</th>
                  <th scope="col">Address</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookingList.map((booking) => (
                  <tr key={booking._id}>
                    <th scope="row">{bookingList.indexOf(booking) + 1}</th>
                    <td>{booking.user_id.username}</td>
                    <td>{booking.vehicle_id.vehicle_name}</td>
                    <td>
                      <div className="table-image">
                        <img
                          src={`http://localhost:90/${booking.vehicle_id.vehicle_image}`}
                          alt="vehicle"
                          height={100}
                          width={200}
                        />
                      </div>
                    </td>
                    <td>{booking.no_of_days}</td>

                    <td>
                      {booking.booking_date}, {booking.booking_time}
                    </td>
                    <td>{booking.contact_no}</td>
                    <td>{booking.address}</td>
                    <td>{booking.status}</td>

                    <td className="action-btns ">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm m-1"
                        onClick={() => updateBookingStatusHandler(booking)}
                      >
                        <BsFillPenFill />
                      </button>
                      <Link to="">
                        <button
                          type="button"
                          className=" btn btn-danger btn-sm m-1"
                          onClick={() => deleteBookingHandler(booking)}
                        >
                          <FaTrashAlt />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDashboard;
