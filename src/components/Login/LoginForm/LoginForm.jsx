import React from "react";
import { Link } from "react-router-dom";
import { TOKEN_POST, USER_GET } from "../../../api";
import useForms from "../../../Hooks/useForms";
import { UserContext } from "../../../UserContext";
import Error from "../../Helper/Error";
import Button from "../../Forms/Button/Button";
import Input from "../../Forms/Input/Input";
import styles from "./LoginForm.module.css";
import stylesBtn from "../../Forms/Button/Button.module.css";
import Head from "../../Helper/Head";

const LoginForm = () => {
  const username = useForms();
  const password = useForms();
  const { userLogin, error, loading } = React.useContext(UserContext);

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUser(token);
    }
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type="text" label="Usuário" name="username" {...username} />
        <Input type="password" label="Senha" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={styles.perdeu} to="/Dogs/login/perdeu">
        Perdeu a senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se agora!</p>
      </div>
      <Link className={stylesBtn.button} to="/Dogs/login/criar">
        Cadastro
      </Link>
    </section>
  );
};

export default LoginForm;
