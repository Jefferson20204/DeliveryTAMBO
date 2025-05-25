import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../store/features/common";
import { addAddressAPI } from "../../../api/userInfo";
import { saveAddress } from "../../../store/features/user";

const AddAddress = ({ onCancel }) => {
  const [values, setValues] = useState({
    street: "",
    number: "",
    reference: "",
    district: "",
    province: "",
    department: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(setLoading(true));
      setError("");
      addAddressAPI(values)
        .then((res) => {
          dispatch(saveAddress(res));
          onCancel && onCancel();
        })
        .catch((err) => {
          setError("Address was not added.");
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, onCancel, values]
  );

  const handleOnChange = useCallback((e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target?.value,
    }));
  }, []);

  return (
    <div>
      <p>Add Address</p>
      <form onSubmit={onSubmit}>
        <label>street</label>
        <input
          type="text"
          name="street"
          value={values?.street}
          onChange={handleOnChange}
          placeholder="street"
          required
        />
        <label>number</label>
        <input
          type="text"
          name="number"
          value={values?.number}
          onChange={handleOnChange}
          placeholder="number"
          required
        />
        <label>reference</label>
        <input
          type="text"
          name="reference"
          value={values?.reference}
          onChange={handleOnChange}
          placeholder="reference"
          required
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="district"
            value={values?.district}
            onChange={handleOnChange}
            placeholder="district"
            required
          />
          <input
            type="text"
            name="province"
            value={values?.province}
            onChange={handleOnChange}
            placeholder="province"
            required
          />
        </div>
        <input
          type="text"
          name="department"
          value={values?.department}
          onChange={handleOnChange}
          placeholder="department"
          required
        />
        <div className="flex gap-4 mt-4">
          <button onClick={onCancel} type="button">
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddAddress;
