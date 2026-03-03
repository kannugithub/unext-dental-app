import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Fragment, useState, useRef, useEffect } from "react";
// import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import styles from "./cardDettails.module.scss";
import Image from "next/image";
import Images from "../../Images/Images";
import {
  addCardDetails,
  fetchgetSavedPayments,
} from "@/app/store/slices/clinicAdminSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLIC_KEY
);

const Wrapper = ({
  closeModal,
  loggedUserData,
  setOpenAddCard,
  setLoading,
  closePopUp,
  userId,
  setOpenCard,
  getSingleOfficeDetailsData,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [complete, setComplete] = useState(false);
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [clinicId, setClinicId] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClinicId(localStorage.getItem("clinicId"));
    }
  }, []);

  useEffect(() => {
    setOpen(open);
    if (!open) {
      closeModal();
    }
  }, [open, closeModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement(CardElement);
    if (submitting) {
      return;
    }
    setSubmitting(true);
    stripe.createToken(cardElement).then((payload) => {
      if (payload.error) {
        toast.error(payload.error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setSubmitting(false);
      } else if (payload.token) {
        const data = {
          userId: userId,
          cardToken: payload.token.id,
          clinicId: clinicId ? clinicId : getSingleOfficeDetailsData?.data?._id,
        };

        try {
          const actionResult = dispatch(addCardDetails(data, closePopUp));
          actionResult.then((result) => {
            dispatch(fetchgetSavedPayments(clinicId));
            if (result?.payload?.success) {
              toast.success(result?.payload?.message);
              setOpenCard(false);
              setSubmitting(false);
            }
          });
        } catch (error) {
          setSubmitting(false);
          toast.error(error.message || "Error adding office");
        }
        // setLoading(true);
      }
    });
  };

  // // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  // const isDarkTheme = localStorage.getItem("theme");

  const onInputChange = (empty, complete, error) => {
    setComplete(complete);
  };
  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.SetOfficeHours_wrapper}>
          <div className={styles.SetOfficeHours_close}>
            {isDarkTheme === "dark" ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => closePopUp(false)}
              >
                <path
                  d="M5.3 18.7C5.5 18.9 5.7 19 6 19C6.3 19 6.5 18.9 6.7 18.7L12 13.4L17.3 18.7C17.5 18.9 17.8 19 18 19C18.2 19 18.5 18.9 18.7 18.7C19.1 18.3 19.1 17.7 18.7 17.3L13.4 12L18.7 6.7C19.1 6.3 19.1 5.7 18.7 5.3C18.3 4.9 17.7 4.9 17.3 5.3L12 10.6L6.7 5.3C6.3 4.9 5.7 4.9 5.3 5.3C4.9 5.7 4.9 6.3 5.3 6.7L10.6 12L5.3 17.3C4.9 17.7 4.9 18.3 5.3 18.7Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                onClick={() => closePopUp(false)}
              >
                <path
                  d="M0.275 12.5583C0.458333 12.7417 0.641667 12.8333 0.916667 12.8333C1.19167 12.8333 1.375 12.7417 1.55833 12.5583L6.41667 7.7L11.275 12.5583C11.4583 12.7417 11.7333 12.8333 11.9167 12.8333C12.1 12.8333 12.375 12.7417 12.5583 12.5583C12.925 12.1917 12.925 11.6417 12.5583 11.275L7.7 6.41667L12.5583 1.55833C12.925 1.19167 12.925 0.641667 12.5583 0.275C12.1917 -0.0916667 11.6417 -0.0916667 11.275 0.275L6.41667 5.13333L1.55833 0.275C1.19167 -0.0916667 0.641667 -0.0916667 0.275 0.275C-0.0916667 0.641667 -0.0916667 1.19167 0.275 1.55833L5.13333 6.41667L0.275 11.275C-0.0916667 11.6417 -0.0916667 12.1917 0.275 12.5583Z"
                  fill="black"
                />
              </svg>
            )}
          </div>

          <div className={styles.main_wrapper}>
            <div className={styles.headline}>
              <h1>Add New Card</h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="py-4">
                <div className={styles.card_div}>
                  <CardElement
                    onChange={({ empty, complete, error }) =>
                      onInputChange(empty, complete, error)
                    }
                    options={{
                      style: {
                        base: {
                          color: isDarkTheme ? "#fff" : "#000",
                          fontSize: "16px",
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div className={styles.Button_wrappr}>
                <div className={styles.sv_btn}>
                  <button type="submit" disabled={submitting}>
                    Save
                  </button>
                </div>
                {/* <div className={styles.cn_btn}>
                  <button onClick={() => closePopUp(false)}>Cancel</button>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const CardDetailsPopup = (props) => (
  <Elements stripe={stripePromise}>
    <Wrapper {...props} />
  </Elements>
);

export default CardDetailsPopup;
