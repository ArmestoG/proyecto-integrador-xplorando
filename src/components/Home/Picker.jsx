import { Formik, Form, Field, ErrorMessage } from "formik";
import { DateContext } from "../../components/Context/DateContext";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsCheck2Circle } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import Calendar from "../Booking/Calendar";
import dateFormat from "dateformat";
import Select from "react-select";
import axios from "axios";
import swal from 'sweetalert';

import "./Picker.css";

function Picker() {
  const { id } = useParams();
  const idProduct = useContext(DateContext);
  

  const startDate = useContext(DateContext);
  const endDate = useContext(DateContext);
  const product = useContext(DateContext);
  const [bookingOk, setBookingOk] = useState(false);

  

  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "50px",
      width: "100%",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.15)",
      fontSize: "15px",
      fontWeight: "700px",
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      fontSize: "15px",
      color: "#383B58",
      fontWeight: "700"
    }),
  };

  const producto = product && product.product;
  const gallery =
    product.product.imagenes &&
    product.product.imagenes.sort((a, b) => a.id - b.id);

  return (
    <>
      <div className="booking"> 
        <Formik
          initialValues={{
            fechaInicio: dateFormat(startDate.startDate, "yyyy-mm-dd"),
            fechaFinal: dateFormat(endDate.endDate, "yyyy-mm-dd"),
            producto: { id: parseInt(id) },
            usuario: { id: 1 } // Reemplaza con el ID del usuario
          }}
          enableReinitialize
          validate={(values) => {
            let error = {};
            return error;
          }}
         
        >
          {({ errors, setFieldValue }) => (
              <div className="booking-information">
                    <section className="booking-date">
                      <div className="card-booking">
                        <Calendar />
                      </div>
                    </section>      
              </div> 
          )}
        </Formik>
      </div>
    </>
  );
}

export default Picker;
