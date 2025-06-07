import { useCallback, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserInfo,
  selectIsUserAdmin,
  loadUserInfo,
} from "../../../store/features/user";
import { setLoading } from "../../../store/features/common";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Buttons/Button";
import Input from "../../../components/Input/Input";
import { fetchUserDetails, updateUser } from "../../../api/userInfo";

const Profile = () => {
  const userInfo = useSelector(selectUserInfo);
  const isUserAdmin = useSelector(selectIsUserAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then((user) => {
        setValues({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
        });
      })
      .catch((err) => {
        setError("Error al cargar los datos del usuario");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  const handleOnChange = useCallback((e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target?.value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    dispatch(setLoading(true));

    try {
      const payload = { ...values, phoneNumber: values.phoneNumber || null };
      const result = await updateUser(payload);

      if (result) {
        fetchUserDetails()
          .then((user) => {
            dispatch(loadUserInfo(user));
          })
          .catch((err) => {
            setError("Error al cargar los datos del usuario");
          });
        navigate("/account-details/profile");
      } else {
        setError("Error al actualizar los datos del usuario");
      }
    } catch (err) {
      setError("Error al actualizar los datos del usuario");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      {/* Perfil */}
      <Card
        type="form"
        title={"Perfil"}
        buttons={
          <Button
            type="submit"
            fullWidth={false}
            variant="primary"
            form="userProfile"
          >
            Guardar
          </Button>
        }
      >
        <div>
          <form onSubmit={handleSubmit} id="userProfile">
            <Input
              type="text"
              name="firstName"
              label="Nombre"
              value={values.firstName}
              onChange={handleOnChange}
              placeholder="Ingrese su nombre"
              className="input"
              required
            />
            <Input
              type="text"
              name="lastName"
              label="Apellido"
              value={values.lastName}
              onChange={handleOnChange}
              placeholder="Ingrese su apellido"
              className="input"
              required
            />
            <Input
              type="text"
              name="phoneNumber"
              label="Número de teléfono"
              value={values.phoneNumber}
              onChange={handleOnChange}
              placeholder="Ingrese su número de teléfono"
              className="input"
            />
            <Input
              type="email"
              name="email"
              label="Correo electrónico"
              value={values.email}
              placeholder="Ingrese su número de teléfono"
              className="input"
              autoComplete="email"
              disabled
              required
            />
          </form>
        </div>
      </Card>

      {/* Roles */}
      <Card type="info" title={"Roles"}>
        <ul>
          {userInfo?.authorityList?.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
        {isUserAdmin && (
          <div className="text-right">
            <Link to={"/admin/products"} className="link">
              Panel de administrador
            </Link>
          </div>
        )}
      </Card>
    </>
  );
};

export default Profile;
