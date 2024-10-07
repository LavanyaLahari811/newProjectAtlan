import "./form.styles.scss";

const Form = ({
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    label,
    onSubmit,
    id_u,
    id_p,
    id_e
  }) => {
    return (
      <div className="auth-container">
        <form onSubmit={onSubmit}>
          <h2>{label}</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id={id_u}
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id={id_e}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id={id_p}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <button type="submit" id="button">{label}</button>
        </form>
      </div>
    );
  };
  export default Form;